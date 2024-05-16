import React, { Component } from 'react';

type SearchBarProps = {
    onSearch: (query: string) => void;
};

type SearchBarState = {
    query: string;
};

class SearchBar extends Component<SearchBarProps, SearchBarState> {
    constructor(props: SearchBarProps) {
        super(props);
        this.state = { query: '' };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ query: event.target.value });
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSearch(this.state.query);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.query} onChange={this.handleInputChange} placeholder="Search..." />
                <button type="submit">Search</button>
            </form>
        );
    }
}

export default SearchBar;