console.log('%c' + [
    '      ::::::::::   ::::    :::   :::::::::::       ::::::::    :::::::::',
    '     :+:          :+:+:   :+:       :+:          :+:    :+:   :+:    :+:',
    '    +:+          :+:+:+  +:+       +:+                 +:+   +:+    +:+',
    '   +#++:++#     +#+ +:+ +#+       +#+              +#++:    +#+    +:+',
    '  +#+          +#+  +#+#+#       +#+                 +#+   +#+    +#+',
    ' #+#          #+#   #+#+#       #+#          #+#    #+#   #+#    #+#',
    '##########   ###    ####       ###           ########    #########'
].join('\n%c') + '\n\n%cMade By %cmuno9748\n%cRepository: %chttps://github.com/muno9748/Ent3D\n', ...(new Array(7).fill().map((e, i) => {
    return `
        color: hsl(${((i / 7) * 36)}, 100%, 50%); 
        margin-left: calc(50% - 170px); 
        font-weight: 900;
    `;
})), `
    font-family: sans-serif; 
    font-size: 1.2rem;
`,`
    color: #6495ED; 
    font-weight: 900; 
    font-size: 1.2rem; 
    font-family: sans-serif;
`,`
    font-family: sans-serif; 
    font-size: 1.2rem;
`,`
    color: #6495ED; 
    font-weight: 900; 
    font-size: 1.2rem; 
    font-family: sans-serif;
`);