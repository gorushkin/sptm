test:
	echo start

build:
	docker build -t worker .

create:
	docker create --name worker_app \
	worker

start:
	docker container start worker_app -a
