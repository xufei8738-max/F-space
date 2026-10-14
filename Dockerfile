# syntax=docker/dockerfile:1.7

FROM --platform=$BUILDPLATFORM node:22.17.1-bookworm-slim AS webui

WORKDIR /src
RUN npm install -g pnpm@10.32.1

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.node.base.json ./
COPY crates/virtual-core/package.json crates/virtual-core/package.json
COPY crates/agent-ui/package.json crates/agent-ui/package.json
COPY crates/agent-gui/package.json crates/agent-gui/package.json
COPY crates/agent-gateway/web/package.json crates/agent-gateway/web/package.json
RUN pnpm install --frozen-lockfile --filter @oneagent/gateway-webui...

# The vendored @tanstack/virtual-core ships TypeScript source (exports point
# at src/ and types/), so the build stage needs the whole package.
COPY crates/virtual-core crates/virtual-core
COPY crates/agent-ui crates/agent-ui
COPY crates/agent-gateway/web crates/agent-gateway/web
RUN pnpm --filter @oneagent/gateway-webui build

FROM --platform=$BUILDPLATFORM golang:1.25-bookworm AS gateway-builder

# Keep these ARGs bare: a default value shadows the per-platform values buildx injects.
ARG TARGETOS
ARG TARGETARCH

WORKDIR /src/crates/agent-gateway

COPY crates/agent-gateway/go.mod crates/agent-gateway/go.sum ./
RUN go mod download

COPY crates/agent-gateway ./
COPY --from=webui /src/crates/agent-gateway/web/dist ./web/dist

RUN CGO_ENABLED=0 GOOS=${TARGETOS} GOARCH=${TARGETARCH} \
    go build -trimpath -ldflags="-s -w" -o /out/oneagent-gateway ./cmd/gateway

FROM debian:bookworm-slim AS runtime

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN useradd --system --uid 10001 --user-group --home-dir /nonexistent --shell /usr/sbin/nologin oneagent \
    && install -d -o oneagent -g oneagent -m 0700 /var/lib/oneagent

COPY --from=gateway-builder /out/oneagent-gateway /usr/local/bin/oneagent-gateway

USER oneagent

ENV PORT=8080 \
    ONEAGENT_GATEWAY_DATA_DIR=/var/lib/oneagent

VOLUME ["/var/lib/oneagent"]

EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/oneagent-gateway"]
