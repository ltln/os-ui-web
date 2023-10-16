import md5 from "md5";
import { config } from "./config";

export const prompt_history: Array<string> = [];

export const terminal_prompts = {
    help: {
        description: "Show information about available commands",
        exec: (c: Array<string>): string => Object.entries(terminal_prompts).map(([x, y]) => `<p><span class="text-green-500">${x}:</span> ${y.description}</p>`).join(''),
    },
    clear: {
        description: "Clear the console",
        exec: (c: Array<string>): string => { 
            const term = document.getElementById('term');
            if (term) {
                term.innerHTML = "";
            }
            return "";
        },
    },
    date: {
        description: "Display current date time",
        exec: (c: Array<string>): string => `<p>${new Date().toLocaleString('en-US')}</p>`
    },
    history: {
        description: "List of executed commands",
        exec: (c: Array<string>): string => prompt_history.map((x,i) => `<p>${i + 1}: <span class="text-green-500">${x}</span></p>`).join('')
    },
    website: {
        description: "Display information about this website",
        exec: (c: Array<string>): string => 
        `
        <p>A website by <a href="https://github.com/ltln" target="_blank">Ty Nguyen @ltln</a></p>
        <p>• Built using: <span class="text-green-500">Next.js v13</span>, <span class="text-green-500">TailwindCSS</span></p>
        <p>• GitHub: <a href="${config.github}" target="_blank">Click here</a></p>
        `
    },
    echo: {
        description: "Display message",
        exec: (c: Array<string>): string => `<p>${c.join(" ")}</p>`
    },
    owo: {
        description: "OwO-ify your message",
        exec: (c: Array<string>): string => `<p>${owoify(c.join(" "))}</p>`
    },
    md5: {
        description: "Encode your message with md5",
        exec: (c: Array<string>): string => `<p>${md5(c.join(" "))}</p>` 
    },
    dice: {
        description: "Random dice number",
        exec: (c: Array<string>): string => {
            return Math.floor(Math.random() * 6).toString();
        }
    },
    "8ball": {
        description: "Ask 8-ball",
        exec: (c: Array<string>): string => {
            if (c.length == 0 || c.join(" ").length < 5) return `<p class="text-red-500">(8) You must provide a question</p>`;
            return '(8) ' + Magic8Ball();
        }
    },
    neko: {
        description: "Get a random neko image (nekos.life)",
        exec: async (c: Array<string>): Promise<string> => {
            const res = await fetch('https://nekos.life/api/v2/img/neko');
            const d = await res.json();
            return `<p>Neko image: <a href="${d.url}" target="_blank">Click here</a> (nekos.life)</p>`;
        }
    }
}

function owoify(s: string) {
    const faces = ["owo","UwU",">w<","^w^"];
    return s.replaceAll('r','w').replaceAll('l','w').replaceAll('R','W').replaceAll('L','W').replaceAll('ove','uv').replaceAll('n','ny').replaceAll('N','NY').replaceAll('!',` ${faces[Math.floor(Math.random() * faces.length)]} `);
}

function Magic8Ball() {
    const answers = [
        "It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes",
        "Reply hazy, try again",
        "Ask again later",
        "Better not tell you know",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful"
    ]

    return answers[Math.floor(Math.random() * answers.length)];
}