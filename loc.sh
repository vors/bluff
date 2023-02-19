#!/bin/bash
set -e

echo "Lines of first party code written"
find . -type f | grep -v node_module | grep -v '\.pyc$' | grep -v '\./\.git' | grep -v './.next' | grep -v '_generated' | grep -v '.DS_Store' | xargs cat | wc -l
