using UnityEngine;
using System.Collections;

public class MovementSteps : MonoBehaviour {
	private float beatTime = 1.0f;
	
	private float beat = 0;
	private float lastBeatTime = 0;
	
	private float initPos = 0.0f;
	
	private GameObject rendererObject;
	
	private int step = 2;
	
	private float rot;
	private float stepTime = 1.0f;
	
	public EaseType easeType;
	
	void Start () {
		initPos = transform.position.x;
		rendererObject = transform.GetChild(0).gameObject;
		
		rot = (float) step / (transform.lossyScale.x*Mathf.PI);
	}
	
	void Beat (int b) {
		
	}
	
	void ContraBeat (int b) {
		lastBeatTime = Time.time;
		beat = b;
		
		iTween.MoveBy(gameObject, iTween.Hash("x", step, "time", stepTime, "easeType", iTweenX.Ease(easeType), "oncomplete", "FixTweenPos"));
		iTween.RotateBy(rendererObject, iTween.Hash("z", -rot, "time", stepTime, "easeType", iTweenX.Ease(easeType)));
	}
	
	void SetTimeBetweenBeats(float t) {
		beatTime = t;
	}
	
	void FixTweenPos() {
		Vector3 wantedPos = transform.position;
		wantedPos.x = Mathf.Round(wantedPos.x/2.0f)*2.0f;
		
		rigidbody.MovePosition(wantedPos);
	}
	
	void SetBeatLength(float y) {
		stepTime = y;
	}
}