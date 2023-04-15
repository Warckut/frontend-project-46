install:
	npm install

lint:
	npx eslint .

test:
	npm test

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage --coverageProvider=v8