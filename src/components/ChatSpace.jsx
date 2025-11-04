import React from 'react';
import evaI from '../assets/evaI.png';

function mdToHtml(text) {
    if (!text) return '';

    const escapeHtml = (s) =>
        s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Linkify only in non-HTML segments
    const autolinkOutsideTags = (html) => {
        const urlRe = /\bhttps?:\/\/[^\s<)]+/g;
        const emailRe = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;
        return html
            .split(/(<[^>]+>)/g)
            .map((part) => {
                if (part.startsWith('<')) return part; // keep tags intact
                return part
                    .replace(
                        urlRe,
                        (m) =>
                            `<a href="${m}" class="text-blue-300 underline hover:text-blue-200" target="_blank" rel="noopener noreferrer nofollow">${m}</a>`
                    )
                    .replace(
                        emailRe,
                        (m) =>
                            `<a href="mailto:${m}" class="text-blue-300 underline hover:text-blue-200">${m}</a>`
                    );
            })
            .join('');
    };

    const escapeInline = (s) => {
        let esc = escapeHtml(s);

        // inline code first (prevents linkifying inside code)
        esc = esc.replace(
            /`([^`]+)`/g,
            '<code class="bg-gray-800 text-green-200 px-1 rounded">$1</code>'
        );

        // Markdown links: [text](https://...), [text](http://...), [text](mailto:...)
        esc = esc.replace(
            /\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g,
            '<a href="$2" class="text-blue-300 underline hover:text-blue-200" target="_blank" rel="noopener noreferrer">$1</a>'
        );

        // Autolink plain URLs/emails only outside the tags created above
        esc = autolinkOutsideTags(esc);

        // bold
        esc = esc.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        // italic
        esc = esc.replace(/\*([^*]+)\*/g, '<em>$1</em>');

        return esc;
    };

    const lines = text.replace(/\r\n/g, '\n').split('\n');
    let inCode = false;
    const out = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith('```')) {
            if (!inCode) {
                inCode = true;
                out.push('<pre class="bg-slate-900 text-green-200 p-2 rounded overflow-auto my-2"><code>');
            } else {
                inCode = false;
                out.push('</code></pre>');
            }
            continue;
        }

        if (inCode) {
            out.push(escapeHtml(line) + '\n');
            continue;
        }

        const hMatch = line.match(/^(#{1,6})\s+(.*)$/);
        if (hMatch) {
            const level = Math.min(hMatch[1].length, 6);
            out.push(
                `<h${level} class="font-semibold mt-2 mb-1 text-${Math.max(2, 3 - level + 3)}xl">${escapeInline(
                    hMatch[2]
                )}</h${level}>`
            );
            continue;
        }

        if (line.match(/^\s*[-*+]\s+/)) {
            const items = [];
            let j = i;
            for (; j < lines.length; j++) {
                const l = lines[j];
                const m = l.match(/^\s*[-*+]\s+(.*)$/);
                if (m) items.push(m[1]);
                else break;
            }
            i = j - 1;
            out.push('<ul class="list-disc list-inside ml-4 my-1">');
            items.forEach((it) => out.push(`<li>${escapeInline(it)}</li>`));
            out.push('</ul>');
            continue;
        }

        if (line.match(/^\s*\d+\.\s+/)) {
            const items = [];
            let j = i;
            for (; j < lines.length; j++) {
                const l = lines[j];
                const m = l.match(/^\s*\d+\.\s+(.*)$/);
                if (m) items.push(m[1]);
                else break;
            }
            i = j - 1;
            out.push('<ol class="list-decimal list-inside ml-4 my-1">');
            items.forEach((it) => out.push(`<li>${escapeInline(it)}</li>`));
            out.push('</ol>');
            continue;
        }

        if (line.trim() === '') {
            out.push('<div class="my-1"></div>');
            continue;
        }

        out.push(`<p class="my-1">${escapeInline(line)}</p>`);
    }

    if (inCode) out.push('</code></pre>');

    return out.join('');
}


const ChatSpace = ({ chat }) => {
    const bubbleClasses = `border w-fit max-w-[80%] border-blue-600 p-2 rounded text-wrap overflow-x-auto ${chat.role == 'user' ? 'bg-blue-900/25' : 'bg-blue-900/80'}`;

    return (
        <div className={`flex my-5 ${chat.role == 'user' ? 'justify-end' : ''}`}>
            {chat.role == 'model' && (
                <img className="h-8 w-8 drop-shadow-lg drop-shadow-blue-500/80" src={evaI} alt="eva" />
            )}

            <div className={bubbleClasses} dangerouslySetInnerHTML={{ __html: mdToHtml(chat.text) }} />
        </div>
    );
};

export default ChatSpace;