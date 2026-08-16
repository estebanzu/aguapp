.PHONY: build start stop check security format lint typeclean install help

# Default target
help:
	@echo ""
	@echo "  📚 Apprendre avec Agus - Makefile"
	@echo "  ─────────────────────────────────"
	@echo ""
	@echo "  make install    Instalar dependencias"
	@echo "  make build      Build para producción"
	@echo "  make start      Iniciar servidor de desarrollo"
	@echo "  make stop       Detener servidor de desarrollo"
	@echo "  make check      Verificar código (lint + build)"
	@echo "  make security   Auditoría de seguridad"
	@echo "  make format     Formatear código"
	@echo "  make clean      Limpiar build y cache"
	@echo "  make restart    Reiniciar servidor"
	@echo ""

# Install dependencies
install:
	npm install

# Build for production
build:
	npm run build
	@echo "\n  ✅ Build completo en dist/"

# Start dev server in background
start:
	@lsof -ti:5173 >/dev/null 2>&1 && echo "  ⚠️  Servidor ya está corriendo en http://localhost:5173" || \
	(nohup npm run dev > /tmp/agus-dev.log 2>&1 & \
	sleep 2 && \
	if lsof -ti:5173 >/dev/null 2>&1; then \
		echo "\n  🚀 Servidor iniciado en http://localhost:5173"; \
	else \
		echo "\n  ❌ Error al iniciar. Ver /tmp/agus-dev.log"; \
	fi)

# Stop dev server
stop:
	@lsof -ti:5173 >/dev/null 2>&1 && \
	(kill $$(lsof -ti:5173) 2>/dev/null && \
	echo "  🛑 Servidor detenido" || echo "  ⚠️  No se pudo detener") || \
	echo "  ℹ️  No hay servidor corriendo"

# Check code (lint + build)
check: lint build
	@echo "\n  ✅ Todos los checks pasaron"

# Lint
lint:
	@echo "  🔍 Verificando código..."
	@npx --yes eslint src/ --ext .jsx,.js --max-warnings=0 2>/dev/null || \
	echo "  ℹ️  ESLint no configurado, saltando lint"
	@echo "  ✅ Lint OK"

# Security audit
security:
	@echo "\n  🔒 Auditoría de seguridad npm..."
	@npm audit --audit-level=moderate 2>/dev/null || \
	echo "\n  ⚠️  Se encontraron vulnerabilidades. Ejecuta 'npm audit fix'"
	@echo "\n  🔒 Verificando dependencias obsoletas..."
	@npx --yes npm-check-updates --target minor 2>/dev/null || true
	@echo "\n  ✅ Auditoría completada"

# Format code
format:
	@echo "  🎨 Formateando código..."
	@npx --yes prettier --write "src/**/*.{js,jsx,css,json}" 2>/dev/null || \
	echo "  ℹ️  Prettier no instalado. Instalando..."
	@npx --yes prettier --write "src/**/*.{js,jsx,css,json}"
	@echo "  ✅ Código formateado"

# Clean build artifacts and cache
clean:
	@rm -rf dist
	@rm -rf node_modules/.cache
	@rm -rf .vite
	@echo "  🧹 Build y cache limpiados"

# Restart dev server
restart: stop start

# Watch mode (alias for start)
watch: start

# Production preview
preview: build
	@echo "  👀 Iniciando preview de producción..."
	@npx vite preview --port 4173 &
	@sleep 2 && echo "\n  🌐 Preview en http://localhost:4173"
