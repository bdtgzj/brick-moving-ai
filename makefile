# cmd
# set path=%NODE22_HOME%;%path%
# cd /D D:\tmp\yxd\astro\starlight\vigorous-visual
# npm run dev

# cmd
NODE22_HOME:=D:\share\node-v22.18.0-win-x64\node-v22.18.0-win-x64
PATH:=$(NODE22_HOME):$(PATH)

check-env:
	@echo "$(PATH)"
	node -v

inst-deps:
	npm install

run-dev:
	npm run dev

visit:
	curl -ivL http://localhost:4321/

install-startlight-blog:
	npm i starlight-blog

run-build:
	npm run build

public:
	git add .
	git commit . -m ""
	git push
