import { Router } from 'express';
import Controller from './app/Controller/Controller.js';

const router = Router();

router.post("/registrar", Controller.registrar);
router.post("/entrar", Controller.entrar);
router.get("/produtos", Controller.listaProduto);
router.get("/produtos/:id?", Controller.listarUmProduto);
router.post("/meus-produtos", Controller.meusProdutos);
router.delete("/meus-produtos/:id?", Controller.deletarProduto)
router.post("/meus-produtos/cadastrar-produto", Controller.cadastreProduto)
router.post("/carrinho", Controller.adicionarCarrinho)
router.post("/meu-carrinho", Controller.buscarCarrinho)
router.delete("/meu-carrinho/:id?", Controller.removerProdutoCarrinho)
router.delete("/minha-conta/:id?", Controller.removerConta)
router.post("/minhas-compras", Controller.adicionarCompra)
router.post("/buscar-minhas-compras", Controller.buscaCompra)
router.get("/minhas-compras/:id?", Controller.localizarCompra)

export default router;