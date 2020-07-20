Object.keys(Entry.Command).forEach(l => {
    if(Entry.Command[l].do) {
        ((eventType) => {
            Entry.Command[eventType]._do = Entry.Command[eventType].do.bind(Entry.Command);
            Entry.Command[eventType].do = (...args) => {
                const id = setInterval(() => {
                    const findedObjects = Array.from(document.querySelectorAll('image')).filter(l => l.getAttribute('href')?.startsWith('/lib/entry-js/images/https://'))
                    findedObjects.forEach(l => l.setAttribute('href', l.getAttribute('href').replace('/lib/entry-js/images/', '')))
                }, 50);
                setTimeout(() => {
                    clearInterval(id)
                }, 1000);
                return Entry.Command[eventType]._do(...args);
            }
        })(l);
    }
})
setInterval(() => {
    const findedObjects = Array.from(document.querySelectorAll('image')).filter(l => l.getAttribute('href')?.startsWith('/lib/entry-js/images/https://'))
    findedObjects.forEach(l => l.setAttribute('href', l.getAttribute('href').replace('/lib/entry-js/images/', '')))
}, 100);