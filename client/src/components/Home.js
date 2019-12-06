import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>You've got flat!</h1>
                <form>
                    <button>Get started!</button>
                </form>
                <div>
                    <h3>How it works:</h3>
                    <span>(1) Set your preferences</span><br></br>
                    <span>(2) Wait for emails...</span><br></br>
                    <span>(3) View automatically contacted flats in your viewings</span>
                </div>
            </div>
        )
    }
}
