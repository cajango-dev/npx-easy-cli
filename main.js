#!/usr/bin/env node

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import Conf from "conf";

// Instância para armazenar configurações do usuário com um nome de projeto
const config = new Conf({ projectName: "npx-easy-cli" }); // Especifique o nome do projeto

// Carregar chalk dinamicamente
const chalk = (await import("chalk")).default;

const argv = yargs(hideBin(process.argv))
  .command(
    "hello",
    "Imprime uma saudação",
    {
      name: {
        description: "Seu nome",
        alias: "n",
        type: "string",
      },
    },
    (argv) => {
      console.log(chalk.green(`Olá, ${argv.name || "mundo"}!`)); // Saída em verde para saudação
    }
  )
  .command(
    "sum [a] [b]",
    "Soma dois números",
    (yargs) => {
      yargs.positional("a", { type: "number", default: 0, describe: "Primeiro número" });
      yargs.positional("b", { type: "number", default: 0, describe: "Segundo número" });
    },
    (argv) => {
      console.log(chalk.blue(`Resultado: ${argv.a + argv.b}`)); // Resultado em azul
    }
  )
  .command(
    "config <key> [value]",
    "Define ou exibe uma configuração",
    {},
    (argv) => {
      if (argv.value) {
        // Define uma nova configuração
        config.set(argv.key, argv.value);
        console.log(chalk.yellow(`Configuração salva: ${argv.key} = ${argv.value}`)); // Saída em amarelo ao salvar
      } else {
        // Exibe a configuração existente
        const value = config.get(argv.key);
        console.log(
          value
            ? chalk.magenta(`Valor de ${argv.key}: ${value}`) // Saída em magenta para exibição
            : chalk.red(`Configuração '${argv.key}' não encontrada`)
        );
      }
    }
  )
  .usage(chalk.cyan("Uso: easycli <comando> [opções]"))
  .help()
  .epilog(chalk.gray("Obrigado por usar o easycli!"))
  .argv;
