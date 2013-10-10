#pragma strict

public var title : Texture2D;
public var key : Texture2D;

private var showKey : boolean = true;
public var frequency : float = 2;

private var time : float = 0;

private var player : GameObject;
private var pressingTime : float = 0;

function Start() {
	player = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
	showKey = !Input.anyKey;
	
	if (showKey) {
		pressingTime = 0;
		time += Time.deltaTime;
	}
	else {
		time = 0;
		pressingTime += Time.deltaTime;
		
		if (pressingTime > 3) {
			player.GetComponent(Movement).enabled = true;
		}
	}
}

function OnGUI() {
	GUI.DrawTexture(Rect(Screen.width/15, Screen.height/15, Mathf.Min(Screen.width/3, title.width), Mathf.Min(Screen.height/3, title.height)), title, ScaleMode.ScaleToFit);
	var aux : int = time;
	if (showKey && (aux%frequency == 0))
		GUI.DrawTexture(Rect(Screen.width/2-key.width/8, Screen.height/2-key.height/8, key.width/4, key.height/4), key, ScaleMode.ScaleToFit);
}