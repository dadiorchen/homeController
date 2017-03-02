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
  View,
  Image,
  Alert,
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
		setTimeout(this.updateStatus,1000);
	}
	
	updateStatus = () =>{
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


	temp =				{/*
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
				*/}
	render() {
		return (
			<Image source={require('./img/background1.png')} style={{
				flex:1,
				width:null,
				resizeMode:'stretch',
				
				}}>
				<View style={{
					flex:1,
					flexDirection:'column',
					alignItems:'stretch',
					justifyContent:'center',
					backgroundColor: 'rgba(0,0,0,0)',
					flexGrow:1,
					}} >
					<View style={{flex:40,
							backgroundColor:'white',
					}} >
						<Text></Text>
					</View>
					<View style={{
						flex:242,
						justifyContent:'center',
						alignItems:'center',
						}} >
						<Image source={require('./img/title.png')} style={{
							width:128,
							height:38,
						}} />
					</View>
					<View 
						style={{
							flex:53,
							flexDirection:'row',
							borderTopWidth:2,
							borderBottomWidth:2,
							borderColor:'#e3e3e3',
							backgroundColor:'#f0f0f0',
							justifyContent:'space-between'
						}} >
						<View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
						<Image source={require('./img/homeServer.png')}
							style={{
								marginLeft:24,
								width:80,
								height:10,
							}}/>
						<Image
							source={this.state.isHomeServerRunning?require('./img/runningStatus.png'):require('./img/stopStatus.png')}
							style={{
								marginRight:25,
								width:12,
								height:12,
								}} />
						</View>
					</View>
					<View style={{
						flex:170,
						justifyContent:'center',
						alignItems:'flex-end',
						flexDirection:'row',
						}} >
						<TouchableHighlight 
						onPress={() => Alert.alert(
								'确定要开机吗？',
								'',
								[
								{text: '放弃', onPress: () => console.log('Cancel Pressed!')},
								{text: '确定', onPress: () => this.onStartup()},
								]
								)}>
								<Image 
									source={require('./img/btnON.png')}
									style={{
										width:24,
										height:24,
										marginRight:14,
										marginBottom:25,
									}}
								/>
							</TouchableHighlight>
						<Image 
							source={require('./img/robot.png')}
							style={{
								width:150,
								height:77,
							}}
						/>
						<TouchableHighlight 
						onPress={() => Alert.alert(
								'确定要关机吗？',
								'',
								[
								{text: '放弃', onPress: () => console.log('Cancel Pressed!')},
								{text: '确定', onPress: () => this.onShutdown()},
								]
								)}>
						<Image 
							source={require('./img/btnOFF.png')}
							style={{
								width:23,
								height:23,
								marginLeft:14,
								marginBottom:25,
							}}
						/>
						</TouchableHighlight>
					</View>
					<View style={{
						flex:370*2,
						flexDirection:'column',
						flexWrap:'wrap',
						justifyContent:'center',
						}} >
						<View
							style={{
								flex:1,
								flexDirection:'row',
								}}>
							<View
								style={{
									flex:1,
									borderTopWidth:1,
									borderRightWidth:0.5,
									borderBottomWidth:0.5,
									borderColor:'#e3e3e3',
									justifyContent:'center',
									alignItems:'center',
								}}>
								<Image
									source={require('./img/facebookLogo.png')}
									style={{
										width:46,
										height:46,
										margin:5,
									}}
								/>
								<Text
									style={{
										color:'#6e6d68',
										fontSize:12,
										margin:5,
									}}>Facebook</Text>
								<Image
									source={this.state.isFacebookReachable?require('./img/runningStatus.png'):require('./img/stopStatus.png')}
									style={{
										marginRight:25,
										width:12,
										height:12,
										top:-12,
										left:-34,
										}} />
							</View>
							<View
								style={{
									flex:1,
									borderTopWidth:1,
									borderLeftWidth:0.5,
									borderBottomWidth:0.5,
									borderColor:'#e3e3e3',
									justifyContent:'center',
									alignItems:'center',
								}}>
								<Image
									source={require('./img/googleLogo.png')}
									style={{
										width:46,
										height:46,
										margin:5,
									}}
								/>
								<Text
									style={{
										color:'#6e6d68',
										fontSize:12,
										margin:5,
									}}>Google</Text>
								<Image
									source={this.state.isGoogleReachable?require('./img/runningStatus.png'):require('./img/stopStatus.png')}
									style={{
										marginRight:25,
										width:12,
										height:12,
										top:-12,
										left:-34,
										}} />
							</View>
						</View>
						<View
							style={{
								flex:1,
								flexDirection:'row',
								}}>
							<View
								style={{
									flex:1,
									borderTopWidth:0.5,
									borderRightWidth:0.5,
									borderBottomWidth:1,
									borderColor:'#e3e3e3',
									justifyContent:'center',
									alignItems:'center',
								}}>
								<Image
									source={require('./img/twLogo.png')}
									style={{
										width:46,
										height:46,
										margin:5,
									}}
								/>
								<Text
									style={{
										color:'#6e6d68',
										fontSize:12,
										margin:5,
									}}>Twitter</Text>
								<Image
									source={this.state.isTwitterReachable?require('./img/runningStatus.png'):require('./img/stopStatus.png')}
									style={{
										marginRight:25,
										width:12,
										height:12,
										top:-12,
										left:-34,
										}} />
							</View>
							<View
								style={{
									flex:1,
									borderTopWidth:0.5,
									borderLeftWidth:0.5,
									borderBottomWidth:1,
									borderColor:'#e3e3e3',
									justifyContent:'center',
									alignItems:'center',
								}}>
								<Image
									source={require('./img/wikiLogo.png')}
									style={{
										width:46,
										height:46,
										margin:5,
									}}
								/>
								<Text
									style={{
										color:'#6e6d68',
										fontSize:12,
										margin:5,
									}}>Wikiepedia</Text>
								<Image
									source={this.state.isWikipediaReachable?require('./img/runningStatus.png'):require('./img/stopStatus.png')}
									style={{
										marginRight:25,
										width:12,
										height:12,
										top:-12,
										left:-34,
										}} />
							</View>
						</View>
					</View>
					<View style={{
						flex:88,
						flexDirection:'row',
						justifyContent:'center',
						alignItems:'center',
						backgroundColor:'white',
						}} >
						<TouchableHighlight onPress={this.refresh} activeOpacity={190}>
							<View style={{
								borderLeftWidth:1,
								borderRightWidth:1,
								borderColor:'#e3e3e3',
								width:115,
								height:20,
								justifyContent:'center',
								alignItems:'center',
							}}>
							<Text style={{
								fontFamily:'helvetica',
								color:'#4f4d4f',
								fontWeight:'bold',
							}}>Refresh</Text>
							</View>
						</TouchableHighlight>
					</View>
				</View>
			</Image>
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
