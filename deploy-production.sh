docker compose -f docker-compose.production.yml down && \
    docker compose -f docker-compose.production.yml pull && \
    GATEWAY_PORT=8001 docker compose -f docker-compose.production.yml up -d;
