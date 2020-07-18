if(Entry.projectId && Entry.getMainWS()) {
    const exportedProject = Entry.exportProject();
    const projectData = await (await fetch(`https://playentry.org/api/project/${Entry.projectId}`)).json();
    Entry.clearProject()
    Entry.loadProject(Object.keys(exportedProject).reduce((accumulator, key) => {
        accumulator[key] = projectData[key];
        return accumulator;
    }, {}))
}