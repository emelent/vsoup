import React, { Component } from 'react'
import logo from '../../assets/img/logo.svg'
import './Other.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {push} from 'react-router-redux'
class Other extends Component {

	render() {
	  const {mook, push} = this.props
		return (
			<div className="Other">
				<header className="Other-header">
					<img src={logo} className="Other-logo" alt="logo" />
					<h1 className="Other-title">Welcome to the Other Page</h1>
				</header>
				<p className="Other-intro">
          To get started, edit <code>src/Other.js</code> and save to reload.
				</p>
				<button onClick={mook}>Mook</button>
				<button onClick={() => push('/')}>Go Home</button>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	mook: () => ({type: 'MOOK'}),
	push
}, dispatch)

const mapStateToProps = () => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(Other)
