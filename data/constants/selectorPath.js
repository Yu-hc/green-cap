const pages = "xpath//html/body/div[10]/div[1]/div/p/span"
const evaluation = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div"
const evaluationButton1 =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(2) > div > div > div.PY6Xd > div.lLfZXe.fnxRtf.BpKDyb > span > div > label:nth-child(2) > div.eRqjfd > div > div > div.vd3tt"
const evaluationButton2 =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(3) > div > div > div.PY6Xd > div.lLfZXe.fnxRtf.BpKDyb > span > div > label:nth-child(2) > div.eRqjfd > div > div > div.vd3tt"
const suggestion = "tbody > tr:nth-child(7) > td > span > input"
const nextPage1 =
	"#questiontable > tbody > tr > td > table > tbody > tr:nth-child(1) > td > button"
const nextPage2 =
	"#questiontable > tbody > tr> td > table > tbody > tr:nth-child(1) > td > div.col-12:nth-child(2) > button:nth-child(1)"

const selectGroup =
	"#group-tr > td.data.col-5.greenhighlight > span > span > select"
const group =
	"#mG61Hd > div > div > div > div:nth-child(1) > div > div > div.vQES8d > div > div > div"
const discussTopic = "#title-tr > td.data.col-5 > span > input"
const username = "#rcmloginuser"
const password = "#rcmloginpwd"
const login = "#rcmloginsubmit"
const sender = "td.subject > span.fromto.skip-on-drag > span > span"
const title = "td.subject > span.subject > a > span"
const mail = "table > tbody > tr"
const formUrl = "#message-htmlpart1 > div > p:nth-child(2) > a"
const nextPageWebmail = "#rcmbtn116"

module.exports = Object.freeze({
	pages: pages,
	evaluation: evaluation,
	evaluationButton1: evaluationButton1,
	evaluationButton2: evaluationButton2,
	suggestion: suggestion,
	nextPage1: nextPage1,
	nextPage2: nextPage2,
	selectGroup: selectGroup,
	group: group,
	discussTopic: discussTopic,
	username: username,
	password: password,
	login: login,
	sender: sender,
	title: title,
	mail: mail,
	formUrl: formUrl,
	nextPageWebmail: nextPageWebmail,
})
