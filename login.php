<?php

$remember = (Input::get('remember') == 'checked') ? true : false;

$login = $user->login(Input::get('username'), Input::get('password'), $remember);

if($login){

	if(isset($user->data()->username)) echo $user->data()->username; else echo $user->data()->email;

}else{

	echo 'x';
}