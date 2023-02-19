# lint all formating
lint:
	npx prettier --check .

# fix all formating
fix:
	npx prettier --write .

# get number of lines of first party code
loc:
	./loc.sh

# check all the types
typecheck:
	npx convex typecheck

# install requirements and hooks
install:
	npm install && pip install -r requirements.txt && echo "make lint" > .git/hooks/pre-push
