import React, {Component} from 'react';
import "./search.css";

type SearchBarProps = {
    onSearch: (query: string) => void;
};

type SearchBarState = {
    query: string;
};

/*const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`);
};*/

/*<SearchBar onSearch={handleSearch}/>*/

class SearchBar extends Component<SearchBarProps, SearchBarState> {
    constructor(props: SearchBarProps) {
        super(props);
        this.state = {query: ''};
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({query: event.target.value});
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSearch(this.state.query);
    };

    render() {
        return (
            <main className="search-container">
                <form onSubmit={this.handleSubmit} className="search-bar">
                    <input type="text" value={this.state.query} onChange={this.handleInputChange}
                           placeholder="Search..."
                           className="search-input"/>
                    <button type="submit" className="search-button">Search</button>
                </form>
            </main>
        );
    }
}

export default SearchBar;
