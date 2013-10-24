#pragma strict



function Update () {
	transform.localScale += Vector3.one*Time.deltaTime*10;
	//renderer.material.color.a = Mathf.Lerp(255, 128, transform.localScale.x/4);
	if(transform.localScale.x >= 4) Destroy(gameObject);
}