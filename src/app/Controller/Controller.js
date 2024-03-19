import Repository from '../Repository/Repository.js'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';
import path from 'path';
import shortid from 'shortid';

class Controller {

    async registrar(req, res) {
        const user = req.body;
        const row = await Repository.criarUser(user)
        res.json(row)
    }

    async entrar(req, res) {
        const user = req.body
        await Repository.entrarUser(user, res)
    }

    async listaProduto (req, res) {
        const row = await Repository.listarProdutos()
        res.json(row)
    }

    async listarUmProduto (req, res) {
        const id = req.params.id
        const row = await Repository.listarApenasUmProduto(id)
        res.json(row)
    }

    async meusProdutos(req, res) {
        const headerToken = req.header('Authorization');
        const row = await Repository.todosMeusProdutos(headerToken)
        res.json(row)
    }

    async deletarProduto(req, res) {
        const id = req.params.id
        const row = await Repository.deleteProduto(id)
        res.json(row)
    }

    async cadastreProduto (req, res) {
        const produto = req.body
        const row = await Repository.cadastrarProduto(produto)
        res.json(row)
    }

    async adicionarCarrinho(req, res) {
        const produto = req.body
        const row = await Repository.adicionarAoCarrinho(produto)
        res.json(row)
    }

    async buscarCarrinho (req, res) {
        const headerToken = req.header('Authorization');
        const row = await Repository.buscarMeuCarrinho(headerToken)
        res.json(row)
    }

    async removerProdutoCarrinho (req, res) {
        const id = req.params.id
        const row = await Repository.deletarProdutoCarrinho(id)
        res.json(row)
    }

    async removerConta (req, res) {
        const id = req.params.id
        const row = await Repository.removerSuaConta(id)
        res.json(row)
    }

    async adicionarCompra (req, res) {
        const compra = req.body
        const row = await Repository.adicionarUmaCompra(compra)
        res.json(row)
    }

    async buscaCompra(req, res) {
        const headerToken = req.header('Authorization');
        const row = await Repository.buscarCompras(headerToken)
        res.json(row)
    }

    async localizarCompra (req, res) {
        const id = req.params.id
        const row = await Repository.localizaCompraTotal(id)
        res.json(row)
    }

}

export default new Controller();