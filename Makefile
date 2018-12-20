build: clean
	@echo "start building"
	npx tsc --project packages/mppack/tsconfig.json
	npx tsc --project packages/bmue/tsconfig.json
	@echo "build successfully 👏\n"

watch: clean
	@echo "start building"
	npx tsc -w --project packages/mppack/tsconfig.json

clean:
	@echo "start cleaning"
	rm -rf packages/mppack/lib
	rm -rf packages/bmue/lib
	@echo "start cleaning successfully 👏\n"
