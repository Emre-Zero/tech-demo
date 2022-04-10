## Show help
help:
	@awk '{ \
			if ($$0 ~ /^[a-zA-Z\-\_0-9.]+:/) { \
				helpCommand = substr($$0, 0, index($$0, ":")); \
				if (helpMessage) { \
					printf "\033[0;33m%-20s\033[0m %s\n", \
						helpCommand, helpMessage; \
					helpMessage = ""; \
				} \
			} else if ($$0 ~ /^##/) { \
				if (helpMessage) { \
					helpMessage = helpMessage"\n                     "substr($$0, 3); \
				} else { \
					helpMessage = substr($$0, 3); \
				} \
			} else { \
				if (helpMessage) { \
					print "\n "helpMessage"\n" \
				} \
				helpMessage = ""; \
			} \
		}' \
		$(MAKEFILE_LIST)

dcf = .docker/docker-compose.yml
codeNodeModules = $(codeDir)/node_modules
frontendDir = '../collectx-frontend-v2'
frontendNodeModules = $(frontendDir)/node_modules

## Start+build container
go: stop
	docker-compose -f $(dcf) up --build

## Stop container
stop:
	docker-compose -f $(dcf) stop

## SSH into container
ssh-web:
	docker exec -it tech-demo /bin/ash
