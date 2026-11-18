# Blog resmi Zevrigo (DEC-37): situs statis Next.js, disajikan zevrigo-demo mode web.
.PHONY: blog-check check-all

blog-check:
	npm ci --ignore-scripts --no-audit --no-fund && npm run check

check-all: blog-check
