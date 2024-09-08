const pages = "xpath//html/body/div[10]/div[1]/div/p/span"
const evaluation = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div"
const evaluationButton1 =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(2) > div > div > div.PY6Xd > div.lLfZXe.fnxRtf.BpKDyb > span > div > label:nth-child(2) > div.eRqjfd > div > div > div.vd3tt"
const evaluationButton2 =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(3) > div > div > div.PY6Xd > div.lLfZXe.fnxRtf.BpKDyb > span > div > label:nth-child(2) > div.eRqjfd > div > div > div.vd3tt"
const suggestion =
	"xpath//html/body/div[10]/div[1]/div/form/div/table/tbody/tr[7]/td[3]/span/input"
const nextPage1 =
	"xpath//html/body/div[10]/div[1]/div/form/div/table/tbody/tr[2]/td/table/tbody/tr[1]/td/button"
const nextPage2 =
	"xpath//html/body/div[10]/div[1]/div/form/div/table/tbody/tr[8]/td/table/tbody/tr[1]/td/div[2]/button"
const selectGroup =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(1) > div > div > div.vQES8d > div > div:nth-child(1) > div.ry3kXd"
const group =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(1) > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div.MocG8c.HZ3kWc.mhLiyf.OIC90c.LMgvRb.KKjvXb"
const discussTopic =
	"#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(2) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input"
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
