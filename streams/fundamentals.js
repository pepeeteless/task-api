//STREAMS:
//Ler pequenas partes de alguma coisa, e ja conseguir trabalhar com os dados, mesmo sem ter o arquivo completo.
//assim como ver um video no youtube sem carregar ele por inteiro.
//ouvir uma musica sem ter baixado.
//ver um filme enquanto ele carrega.


//Sem STREAM:
//Importação de Cliente .csv (excel)
// 1GB - 1.000.000
//POST /upload import.csv
//10mb/s - 100s
//100s -> Inserção no banco de dados

//Com STREAM:
//Ao mesmo tempo que o arquivo é importado ele é processado e adicionado ao banco de dados, tudo ao mesmo tempo!



//Readable Streams | Writable Streams

//Writable Streams -> Envia pro front-end aos poucos! - a gente escreve (manda)
//Readable Streams -> Recebemos do front-end aos poucos! - a gente lê (recebe)



//Stream ->

//process.stdin.pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {

    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, ecoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}


new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())
