/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  Modal,
  TouchableHighlight,
  NativeModules,
  View
} from 'react-native';

export default class HomeController extends Component {
	constructor(props){
		super(props);
		this.state = {
			isHomeServerRunning : false,
			isGoogleReachable : false,
			isFacebookReachable : false,
			isTwitterReachable : false,
			isWikipediaReachable : false,
			startupConfirmModalVisible : false,
			shutdownConfirmModalVisible:false,
		}
	}

	componentDidMount(){
		//console.log('begin send wol...');
		//var wol = require('wake_on_lan');
		//wol.wake('20:DE:20:DE:20:DE');
		//console.log('sent wol finished!');


		this.refresh();
	}

	refresh = () =>{
		this.setState( {
			isHomeServerRunning : false,
			isGoogleReachable : false,
			isFacebookReachable : false,
			isTwitterReachable : false,
			isWikipediaReachable : false,
			startupConfirmModalVisible : false,
			shutdownConfirmModalVisible:false,
		});
		//test ping
		let thisObj = this;
		fetch("http://192.168.31.178:8888").then(function(res){
			console.log(res);
			console.log(res.status);
			console.log(res.ok);
			if(res.ok){
				thisObj.setState({isHomeServerRunning:true});
			}
			}).catch((error) =>{
				console.log("get error:",error);
				thisObj.setState({isHomeServerRunning:false});
			});
		fetch("https://www.google.com").then(function(res){
			console.log(res);
			console.log(res.status);
			console.log(res.ok);
			if(res.ok){
				thisObj.setState({isGoogleReachable:true});
			}
			}).catch((error) =>{
				thisObj.setState({isGoogleReachable:false});
				console.log("get error:",error);
			});
		fetch("https://www.facebook.com").then(function(res){
			console.log(res);
			console.log(res.status);
			console.log(res.ok);
			if(res.ok){
				thisObj.setState({isFacebookReachable:true});
			}
			}).catch((error) => {
				console.log("get error:",error);
				thisObj.setState({isFacebookReachable:false});
			});
		fetch("https://twitter.com").then(function(res){
			console.log(res);
			console.log(res.status);
			console.log(res.ok);
			if(res.ok){
				thisObj.setState({isTwitterReachable:true});
			}
			}).catch((error) => {
				console.log("get error:",error);
				thisObj.setState({isTwitterReachable:false});
			});
		fetch("https://zh.wikipedia.org").then(function(res){
			console.log(res);
			console.log(res.status);
			console.log(res.ok);
			if(res.ok){
				thisObj.setState({isWikipediaReachable:true});
			}
			}).catch((error) => {
				console.log("get error:",error);
				thisObj.setState({isWikipediaReachable:false});
			});
	}

	onPressShutdown = () =>{
		this.setState({shutdownConfirmModalVisible:true});
	}
	onShutdown = () => {
		let shutdownUrl ="http://192.168.31.178:8888/shutdown"; 
		fetch(shutdownUrl).then(function(res){
			console.log(res);
			console.log(res.status);
			console.log(res.ok);
			if(res.ok){
				console.log("send shutdown msg OK");
			}
			}).catch((error) => {
				console.log("get err when shutdown home server!",shutdownUrl);
				console.log(error);
			});
		this.setState({shutdownConfirmModalVisible:false});
	}
	onShutdownCancel = () =>{
		console.log("cancel shutdown!");
		this.setState({shutdownConfirmModalVisible:false});
	}
	onPressStartup = () => {
		//show the confirm modal dialog
		this.setState({startupConfirmModalVisible:true});
	}
	onStartup = () =>{
		console.log("starting server...");
		let TryNative = NativeModules.TryNative;
		TryNative.addEvent('Birthday Party', '4 Privet Drive, Surrey');
		this.setState({startupConfirmModalVisible:false});
	}
	onStartupCancel = () =>{
		console.log("cancel start server");
		this.setState({startupConfirmModalVisible:false});
	}

	render() {
		return (
				<View style={styles.container}>
					<Modal
						animationType={"slide"}
						transparent={false}
						visible={this.state.startupConfirmModalVisible}
					>
						<View style={{marginTop: 22}}>
						<View>
							<Text>你确定要启动服务器吗？</Text>
							<TouchableHighlight onPress={this.onStartup} >
							<Text>启动</Text>
							</TouchableHighlight>
							<TouchableHighlight onPress={this.onStartupCancel} >
							<Text>放弃</Text>
							</TouchableHighlight>
						</View>
						</View>	
					</Modal>
					<Modal
						animationType={"slide"}
						transparent={false}
						visible={this.state.shutdownConfirmModalVisible}
					>
						<View style={{marginTop: 22}}>
						<View>
							<Text>你确定要关闭服务器吗？</Text>
							<TouchableHighlight onPress={this.onShutdown} >
							<Text>启动</Text>
							</TouchableHighlight>
							<TouchableHighlight onPress={this.onShutdownCancel} >
							<Text>放弃</Text>
							</TouchableHighlight>
						</View>
						</View>	
					</Modal>
					<Text style={styles.welcome}>
					Dean Oliver 家庭网络控制器
					</Text>
					<Text style={styles.instructions}>
					Home Server 状态:{this.state.isHomeServerRunning ? '运行中' : '已停机' }
					</Text>
					<Button
						onPress={this.onPressShutdown}
						color="#841584"
						title="关机"
					/>
					<Button
						onPress={this.onPressStartup}
						color="#841584"
						title="开机"
					/>
					<Text style={styles.instructions}>
					Google:{this.state.isGoogleReachable ? '通畅' : '受阻' }
					</Text>
					<Text style={styles.instructions}>
					Facebook:{this.state.isFacebookReachable ? '通畅' : '受阻' }
					</Text>
					<Text style={styles.instructions}>
					Twitter:{this.state.isTwitterReachable ? '通畅' : '受阻' }
					</Text>
					<Text style={styles.instructions}>
					维基百科:{this.state.isWikipediaReachable ? '通畅' : '受阻' }
					</Text>
					<Button
						onPress={this.refresh}
						color="#841584"
						title="刷新"
					/>
				</View>
			   );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HomeController', () => HomeController);
