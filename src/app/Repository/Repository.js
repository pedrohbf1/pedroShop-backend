import { consulta } from "../database/database.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

class Repository {

    criarUser(user) {
        const sql = "INSERT INTO usuarios SET ?"
        const mensagemErro = "Não foi possivel criar usuario"
        const senhaCriptografada = bcrypt.hashSync(user.senha, 10)
        user.senha = senhaCriptografada
        const token = jwt.sign({ userId: user.senha }, 'seuSegredo');
        const objeto = {
            ...user,
            token: token
        }
        return consulta(sql, objeto, mensagemErro)
    }

    async entrarUser(user, res) {
        const sql = 'SELECT * FROM usuarios WHERE email = ?'
        const mensagemErro = "Usuario não encontrado" 
        const resultado = await consulta(sql, user.email, mensagemErro)
        
        if(resultado.length > 0) {
            const usuarioEncontrado = resultado[0]
            const senhaCriptografadaCorreta = bcrypt.compareSync(user.senha, usuarioEncontrado.senha )
            if(senhaCriptografadaCorreta) {
                res.status(200).json(usuarioEncontrado)
            } else {
                res.status(500).json({"erro": "senha invalida"})
            }
        } else {
            res.status(500).json({"erro": "email invalido"})
        }
    } 

    listarProdutos() {
        const sql = "SELECT * FROM produtos"
        const mensagemErro = "Não foi possivel listar os produtos"
        return consulta(sql, mensagemErro)
    }

    listarApenasUmProduto(id) {
        const sql = "SELECT * FROM produtos WHERE idProduto = ?"
        const mensagemErro = "Não foi possivel localizar esse produto"
        return consulta(sql, id, mensagemErro)
    }

    todosMeusProdutos(token) {
        const tokenSemBearer = token.split(' ')[1];
        const sql = "SELECT * FROM produtos WHERE tokenVendedor = ? "
        const mensagemErro = "Não foi possivel listar seus produtos cadastrados"
        return consulta(sql, tokenSemBearer, mensagemErro)
    }

    deleteProduto(id) {
        const sql = "DELETE FROM produtos WHERE idProduto = ?"
        const mensagemErro = "Não foi possivel deletar seu produto"
        return consulta(sql, id, mensagemErro)
    }

    cadastrarProduto(produto) {
        const sql = "INSERT INTO produtos SET ?"
        const mensagemErro = "Não foi possivel cadastrar seu produto"
        return consulta(sql, produto, mensagemErro)
    }

    adicionarAoCarrinho(produto) {
        const sql = "INSERT INTO carrinho SET ?"
        const mensagemErro = "Erro ao adicionar produto ao carrinho!"
        return consulta(sql, produto, mensagemErro)
    }

    buscarMeuCarrinho(token) {
        const tokenSemBearer = token.split(' ')[1];
        const sql = "SELECT * FROM carrinho WHERE tokenComprador = ?"
        const mensagemErro = "Erro ao buscar seu carrinho"
        return consulta(sql, tokenSemBearer, mensagemErro)
    }

    deletarProdutoCarrinho(id) {
        const sql = "DELETE FROM carrinho WHERE idProduto = ?"
        const mensagemErro = "Não foi possivel deletar seu produto"
        return consulta(sql, id, mensagemErro)
    }

    removerSuaConta(id) {
        const sql = 'DELETE FROM usuarios WHERE id = ?'
        const mensagemErro = "Não foi possivel apagar esse usuario" 
        return consulta(sql, id, mensagemErro)
    }

    adicionarUmaCompra(compra) {
        const sql = "INSERT INTO compras SET ?"
        const mensagemErro = "Não foi possivel finalizar a venda"
        return consulta(sql, compra, mensagemErro)
    }

    buscarCompras(token) {
        const tokenSemBearer = token.split(' ')[1];
        const sql = "SELECT * FROM compras WHERE tokenComprador = ?"
        const mensagemErro = "Erro ao pegar as suas compras"
        return consulta(sql, tokenSemBearer, mensagemErro)
    }

    localizaCompraTotal(id) {
        const sql = "SELECT * FROM compras WHERE codigoCompra = ?"
        const mensagemErro = "Erro ao pegar sua compra"
        return consulta (sql, id, mensagemErro)
    }

}

export default new Repository()