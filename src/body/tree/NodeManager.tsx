class NodeManager {
    private state = {
        selectedNodeName: '',
        selectedNodeVersionNumber: '',
        selectedNodeReleaseDate: '',
        appEcosystem: '',
        appRepoURL: '',
        appRevision: '',
        isRoot: false
    };

    public setSelectedNodeName(name: string): void {
        this.state.selectedNodeName = name;
    }

    public setSelectedNodeVersionNumber(versionNumber: string): void {
        this.state.selectedNodeVersionNumber = versionNumber;
    }

    public setSelectedNodeReleaseDate(releaseDate: string): void {
        this.state.selectedNodeReleaseDate = releaseDate;
    }

    public setAppEcosystem(ecosystem: string): void {
        this.state.appEcosystem = ecosystem;
    }

    public setAppRepoURL(repoURL: string): void {
        this.state.appRepoURL = repoURL;
    }

    public setAppRevision(revision: string): void {
        this.state.appRevision = revision;
    }

    public setIsRoot(isRoot: boolean): void {
        this.state.isRoot = isRoot;
    }

    public getState() {
        return { ...this.state };
    }

    public resetState() {
        this.state = {
            selectedNodeName: '',
            selectedNodeVersionNumber: '',
            selectedNodeReleaseDate: '',
            appEcosystem: '',
            appRepoURL: '',
            appRevision: '',
            isRoot: false
        };
    }
}

export default NodeManager;
