#pragma strict

public var object : GameObject;
private var script : HammerBeatVertical;
private var col : Color;

function Start () {
	script = object.GetComponent("HammerBeatVertical");
	col = renderer.material.color;
}

function Update () {
	if(script.getActivation()) {
		renderer.material.color = col;
	} else {
		renderer.material.color = col*0.5;
		renderer.material.color.a = col.a;
	}
}