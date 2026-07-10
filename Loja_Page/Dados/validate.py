import json

content = open('dados-produtos.js', 'r', encoding='utf-8').read()
start = content.find('[')
end = content.rfind(']')+1

try:
    produtos = json.loads(content[start:end])
    print('✓ JSON válido!')
    print(f'Total de produtos: {len(produtos)}')
    print(f'Último produto (ID {produtos[-1]["id"]}): {produtos[-1]["nome"]}')
except json.JSONDecodeError as e:
    print(f'✗ Erro JSON: {e}')
    print(f'  Linha: {e.lineno}, Coluna: {e.colno}')
