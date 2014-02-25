﻿#pragma strict

public var followMultiplier : float = 1.0f;

private var lastX : float = 0.0f;

function Start() {
	lastX = Camera.main.transform.position.x;
}

function Update () {
	var x : float = Camera.main.transform.position.x;
	var dX : float = x - lastX;
	transform.position.x += dX * followMultiplier;
	
	lastX = x;
}