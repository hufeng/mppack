build: clean
	@echo "start building"
	npx tsc --project packages/mppack/tsconfig.json
	@echo "build successfully 👏\n"

watch: clean
	@echo "start building"
	npx tsc -w --project packages/mppack/tsconfig.json

clean:
	@echo "start cleaning"
	rm -rf packages/mppack/lib
	@echo "start cleaning successfully 👏\n"
