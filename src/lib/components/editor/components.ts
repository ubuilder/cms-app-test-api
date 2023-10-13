interface Component {
	id: number;
	name: string;
	image: string;
	template: string;
}

// export const components: Component[] = [
// 	{
// 		id: 1,
// 		name: "view",
// 		image: "/editor/view.svg",
// 		template: "<div class = 'u-component'  u-view ><div class = 'u-slot'>View</div></div>"
// 	},
// 	{
// 		id: 2,
// 		name: "col",
// 		image: "/editor/col.svg",
// 		template: "<div class = 'u-component'  u-col><div class = 'u-slot'>Col</div></div>"
// 	},
// 	{
// 		id: 3,
// 		name: "row",
// 		image: "/editor/row.svg",
// 		template: "<div class = 'u-component'  u-row><div class = 'u-slot'>Row</div></div>"
// 	},
// 	{
// 		id: 4,
// 		name: "divider",
// 		image: "/editor/divider.svg",
// 		template: "<div class = 'u-component' u-divi><div class = 'u-slot'>Divider</div></div>"
// 	},
// 	{
// 		id: 5,
// 		name: "input",
// 		image: "/editor/input.svg",
// 		template: "<span  class = 'u-component' ><input  u-input  /></span>"
// 	},
// 	{
// 		id: 6,
// 		name: "spinner",
// 		image: "/editor/spinner.svg",
// 		template: "<span class = 'u-component'><div   u-spinner u-spinner-size ='xl'></div></span>"
// 	},
// 	{
// 		id: 7,
// 		name: "card",
// 		image: "/editor/card.svg",
// 		template: "<div class = 'u-component'  u-card u-card-size ='xl'><div class = 'u-slot'></div></div>"
// 	},
// 	{
// 		id: 8,
// 		name: "texarea",
// 		image: "/editor/textarea.svg",
// 		template: "<span  class = 'u-component'><textarea  u-textarea u-textarea-size ='xl'></textarea></span>"
// 	},
// 	{
// 		id: 9,
// 		name: "button",
// 		image: "/editor/button.svg",
// 		template: "<button class = 'u-component'  u-button u-button-size ='xl'><div class = 'u-slot'>Button</div></button>"
// 	},
// 	{
// 		id: 10,
// 		name: "progress",
// 		image: "/editor/progress.svg",
// 		template: `<div class = 'u-component' ><div u-progress="" ><div u-progress-bar="" value="30" color="error" style="width:10%" u-progress-bar-color="error"></div></div></div>`,
// 	},
// 	{
// 		id: 11,
// 		name: "badge",
// 		image: "/editor/badge.svg",
// 		template: `<span class = 'u-component' u-badge="" u-badge-color="primary"> Badge</span>`,
// 	},
// 	{
// 		id: 11,
// 		name: "heading",
// 		image: "/editor/heading.svg",
// 		template: `<div class = 'u-component'><h2 class = ' u-slot'>this is heading2</h2></div>`,
// 	},
// ];
