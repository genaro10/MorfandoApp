import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../provider/AuthProvider';

// Auth screens
import Onboarding from '../screens/onboarding';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ForgetPassword from '../screens/auth/ForgetPassword';

import Loading from '../screens/Loading';
import { ShopNavigation, UserNavigation } from './BottomTabNavigator';
import { RootStackParams } from '../screens/types';

const AuthStack = createStackNavigator<RootStackParams>();

const Auth = () => {
	return (
		<AuthStack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<AuthStack.Screen name="Onboarding" component={Onboarding} />
			<AuthStack.Screen name="Login" component={Login} />
			<AuthStack.Screen name="Register" component={Register} />
			<AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
		</AuthStack.Navigator>
	);
};

const MainStack = createStackNavigator();

const UserMain = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<MainStack.Screen name="Main" component={UserNavigation} />
		</MainStack.Navigator>
	);
};

const ShopMain = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<MainStack.Screen name="Main" component={ShopNavigation} />
		</MainStack.Navigator>
	);
};

export default () => {
	const { user } = useContext(AuthContext);
	console.log(user);
	return (
		<NavigationContainer>
			{user === null && <Loading />}
			{user === false && <Auth />}
			{user && typeof user === 'object' && user.type === 'user' && <UserMain />}
			{user && typeof user === 'object' && user.type === 'shop' && <ShopMain />}
		</NavigationContainer>
	);
};
