<template>
  <div class="pc_container">
    <div class="allbox">
      <div class="rowbox">
        <div class="actinfo">
          <div class="time">【活动时间】</div>
          <div class="date">2023/06/26 – 2023/07/30</div>
        </div>
        <div class="actinfo">
          <div class="time">【活动对象】</div>
          <div class="date">全体ManBetX万博会员</div>
        </div>
        <div class="actinfo">
          <div class="time">【活动平台】</div>
          <div class="date">同步任务平台</div>
        </div>
      </div>

      <div class="titlebox">
        <div class="actcon">活动内容</div>
        <div class="actinfo">
          快乐无极限，夏日炎炎惠不停，ManBetX万博多重平台多重优惠人人尽享！每日完成指定投注任务即享夏日豪礼，多重奖励满满送给你，愿你拥有一个清凉的夏日！
        </div>
      </div>

      <div class="themeone">
        <div class="onetitle">
          主题一:活动期间会员自然周内于真人、棋牌或电子任意单一平台投注，累计有效投注达以下要求，即可获得对应彩金奖励，完成平台数越多奖励越多。（领取期限：次周周二
          23:59:59 前）
        </div>
        <div class="datecheck">
          <div
            :class="isWeek ? 'triangle point' : 'triangle blue point'"
            @click="changeSubWeek"
          ></div>
          <div class="riqi">自然周：{{ showWeek }}</div>
          <div
            :class="isWeek ? 'trangle point' : 'trangle yellow point'"
            @click="changeNowWeek"
          ></div>
        </div>
        <div class="tabs">
          <div
            :class="action == item.index ? 'tab active point' : 'tab point'"
            v-for="item in checkList"
            @click="changetab(item.index)"
            :key="item.index"
          >
            {{ item.name }}
          </div>
        </div>

        <div class="table">
          <div class="theader">
            <div class="hone">指定任务平台</div>
            <div class="htwo">累计有效投注</div>
            <div class="hthree">奖励</div>
            <div class="hfour">任务状态</div>
          </div>
          <div class="tbody">
            <div class="bodyrow" v-for="item in weekList" :key="item.name">
              <div class="tone">
                <div class="imgbox"><img :src="item.url" /></div>
                <div class="text">{{ item.platform_name }}</div>
              </div>
              <div class="ttwo">
                <Progress
                  :text-inside="true"
                  color="#a9e9fb"
                  :stroke-width="20"
                  :percentage="
                    item.effective_betting >= item.amount
                      ? 100
                      : (item.effective_betting / item.amount) * 100
                  "
                ></Progress>
                <div class="newnum">
                  {{ toThousands(item.effective_betting) }}元/{{
                    toThousands(item.amount)
                  }}元
                </div>
              </div>
              <div class="tthree">{{ item.award }}元</div>
              <div class="tfour">
                <div v-if="item.status == -1">未投注</div>
                <div v-if="item.status == 0">进行中</div>
                <div v-if="item.status > 0">已完成</div>
              </div>
            </div>
          </div>
        </div>

        <div class="getbox">
          <div class="mountbox">
            <div class="able">
              <div class="avai">
                上周可领取彩金：{{
                  activityContent.sub_week.amount
                    ? toThousands(activityContent.sub_week.amount)
                    : 0
                }}元
              </div>
              <Button
                @click="getThisWeek(activityContent.sub_week.amount, 2)"
                :class="
                  !activityContent.is_time_out &&
                  activityContent.sub_week.amount
                    ? 'get twink'
                    : 'get'
                "
                size="mini"
                :disabled="activityContent.is_time_out"
                >{{
                  activityContent.is_time_out ? "已过期" : "领取彩金"
                }}</Button
              >
            </div>
            <div class="able">
              <div class="avai">
                本周可领取彩金：{{
                  activityContent.week.amount
                    ? toThousands(activityContent.week.amount)
                    : 0
                }}元
              </div>
              <Button
                @click="getThisWeek(activityContent.week.amount, 1)"
                :class="activityContent.week.amount ? 'draw twink' : 'draw'"
                size="mini"
                >领取彩金</Button
              >
            </div>
          </div>
          <Button class="record" size="mini" @click="getRecive(1)"
            >派发记录</Button
          >
        </div>
      </div>

      <div class="themetwo">
        <div class="twotitle">
          主题二：参与主题一的会员，自然周内完成指定任务平台数≥5个还可获得额外活跃嘉奖。<br />
          小贴士：自然周为周一00:00:00至周日23:59:59。（领取期限：当周周二
          23:59:59 前）
        </div>
        <div class="table">
          <div class="theader">
            <div class="hone">自然周完成指定任务平台数</div>
            <div class="htwo">额外活跃嘉奖</div>
          </div>
          <div class="tbody">
            <div class="bodyrow" v-for="item in taskList" :key="item.name">
              <div class="tone">{{ item.num }}个</div>
              <div class="ttwo">{{ item.amount }}元</div>
            </div>
          </div>
        </div>
        <div class="mountbox">
          <div class="able">
            <div class="avai">
              已完成指定任务平台数：{{ activityContent.activity.count }}
            </div>
            <Button
              @click="getThisWeek(activityContent.activity.reward, 3)"
              :class="
                activityContent.activity.reward && !activityContent.is_time_out
                  ? 'get twink'
                  : 'get'
              "
              size="mini"
              :disabled="activityContent.is_time_out"
              >领取彩金</Button
            >
          </div>
          <div class="able">
            <div class="avai">
              可领取额外活跃嘉奖：{{
                toThousands(activityContent.activity.reward)
              }}元
            </div>
            <Button class="draw" size="mini" @click="getRecive(2)"
              >派发记录</Button
            >
          </div>
        </div>
      </div>

      <div class="rulebox">
        <img src="../../common/img/rule.png" />
        <div class="ruletext">活动规则</div>
        <div class="content">
          <p>
            【申请方式】获得彩金奖励的会员，点击领取后系统将自动派发至您的游戏账户，届时请您查收。
          </p>
          <div class="kind">【温馨提示】</div>
          <p>
            1.本优惠主题一系统将在游戏结算后进行审核派发，每个自然周各指定任务平台皆可获得一次奖励；主题二将在次周一根据上一周内达成最高条件派发一次。<br />
            2.本优惠所获的彩金奖励需会员手动点击进行领取，如在限定时间内（当周周二23:59:59前）未领取将视为放弃，无法补发。<br />
            3.本优惠所获彩金仅需在真人、棋牌或电子平台（不含捕鱼）完成五倍流水方可提款。<br />
            4.本优惠所需投注不与其他投注活动共享，可与返水活动共享。<br />
            5.本优惠仅对已结算并产生输赢结果的投注流水进行计算。所有拒绝投注，无效投注，打平，任何出现对押情况的投注（例：于百家乐同时下注庄家及闲家，百家乐当中开和退还本金）将不予计算。<br />
          </p>
          <div class="mr">
            本优惠遵循ManBetX万博<span @click="localgo"
              >【一般优惠规则与条款】</span
            >。
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="point" @click="backTop">返回顶部</div>
      </div>
    </div>

    <div v-show="dialogVisible" class="model-box">
      <div class="modelveng" @click="dialogVisible = false"></div>
      <div class="modeltable">
        <div class="bkg">
          <div class="modeltitle">尊敬的用户您好！</div>
          <div class="modelcontent">
            登录即可参与ManBetX万博 “ 盛夏狂欢季 ” 专题活动！
          </div>
          <img
            class="dele"
            @click="dialogVisible = false"
            src="../../common/image/close.png"
          />
        </div>
      </div>
    </div>

    <div v-show="tipdialog" class="model-box">
      <div class="modelveng" @click="tipdialog = false"></div>
      <div class="back_box">
        <div class="post">
          <div class="cbg">
            <div class="modeltitle">温馨提示</div>
            <div class="modelcontent">
              您将领彩金{{ moneyNum }}元，确认后无法取消，详情可至派发记录查阅
            </div>
            <div class="btns">
              <div class="point" @click="confirm">确认</div>
              <div class="cans point" @click="tipdialog = false">取消</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="initdialog" class="model-box">
      <div class="modelveng" @click="initdialog = false"></div>
      <div class="back_box">
        <div class="post">
          <div class="cbg">
            <div class="modeltitle">温馨提示</div>
            <div class="modelcontent">亲，您有彩金未领取，请尽快领哦~</div>
            <div class="btns center">
              <div class="point" @click="initdialog = false">确认</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="drawdialog" class="model-box">
      <div class="modelveng" @click="drawdialog = false"></div>
      <div class="login_box">
        <div class="post">
          <img
            class="close"
            @click="drawdialog = false"
            src="../../common/image/close.png"
          />
          <img class="back" src="../../common/image/rule.png" />
          <div class="title">派发记录</div>
          <div class="container">
            <div class="consbox">
              <div class="table">
                <div class="header">
                  <div class="one">序号</div>
                  <div class="two">平台名称</div>
                  <div class="three">领取时间</div>
                  <div class="four">金额</div>
                  <div class="five">状态</div>
                </div>
                <div>
                  <div
                    class="body"
                    v-for="(item, i) in onelistdata"
                    :key="item.platform_name"
                  >
                    <div class="one">{{ i + 1 }}</div>
                    <div class="two">{{ item.platform_name }}</div>
                    <div class="three">
                      {{ item.draw_time ? item.draw_time : "-" }}
                    </div>
                    <div class="four">{{ item.amount }}</div>
                    <div class="five">
                      {{
                        item.status == 1
                          ? "待领取"
                          : item.status == 0
                          ? "进行中"
                          : item.status == 2
                          ? "已领取"
                          : "已过期"
                      }}
                    </div>
                  </div>
                </div>
              </div>
              <Pagination
                layout="prev, pager, next"
                :total="onetotal"
                @current-change="handleSizeChange"
              ></Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="themedialog" class="model-box">
      <div class="modelveng" @click="themedialog = false"></div>
      <div class="login_box">
        <div class="post">
          <img
            class="close"
            @click="themedialog = false"
            src="../../common/image/close.png"
          />
          <img class="back" src="../../common/image/rule.png" />
          <div class="title">派发记录</div>
          <div class="container">
            <div class="consbox">
              <div class="table">
                <div class="header">
                  <div class="pone">序号</div>
                  <div class="ptwo">额外活跃嘉奖彩金</div>
                  <div class="pthree">领取时间</div>
                  <div class="pfour">状态</div>
                </div>
                <div>
                  <div class="body" v-for="(item, i) in twolistdata" :key="i">
                    <div class="pone">{{ i + 1 }}</div>
                    <div class="ptwo">{{ item.amount }}</div>
                    <div class="pthree">
                      {{ item.draw_time ? item.draw_time : "-" }}
                    </div>
                    <div class="pfour">
                      {{
                        item.status == 1
                          ? "待领取"
                          : item.status == 0
                          ? "进行中"
                          : item.status == 2
                          ? "已领取"
                          : "已过期"
                      }}
                    </div>
                  </div>
                </div>
              </div>
              <Pagination
                layout="prev, pager, next"
                :total="twototal"
                @current-change="handleCurrentChange"
              ></Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Progress,
  Table,
  Loading,
  Dialog,
  Button,
  Pagination,
} from "element-ui";
Vue.use(Progress)
  .use(Dialog)
  .use(Table)
  .use(Loading)
  .use(Pagination);
import {
  _debounce,
  getMondayAndSunday,
  judgeBrowser,
  toThousands,
} from "@/utils";
import { mapGetters } from "vuex";
import { setEncrypt } from "@/common/js/utils";
import {
  asyncGetUsernameByPlatform,
  getUsernameByPlatform,
} from "dev-utils-pkg";

import {
  cumulativeTheme,
  getReceiveList,
  getThemeList,
  getNowWeekMoney,
  getSubWeekMoney,
  getAwardCommen,
} from "@/api";
export default {
  components: {
    Progress: Progress,
    Button,
    Pagination: Pagination,
  },
  data() {
    return {
      checkList: [
        { name: "真人平台", index: 1 },
        { name: "棋牌平台", index: 3 },
        { name: "电子平台", index: 5 },
      ],
      action: 1,
      // 真人
      peopleimgList: [
        {
          url: require("../../common/image/peopleicon/bbin真人.png"),
          award: 38,
          amount: 20000,
          effective_betting: 0,
          platform_name: "BBIN娱乐",
          status: -1,
        },
        {
          url: require("../../common/image/peopleicon/万博娱乐.png"),
          award: 38,
          amount: 20000,
          effective_betting: 0,
          platform_name: "万博娱乐",
          status: -1,
        },
        {
          url: require("../../common/image/peopleicon/ae真人.png"),
          award: 38,
          amount: 20000,
          effective_betting: 0,
          platform_name: "AE性感百家",
          status: -1,
        },
        {
          url: require("../../common/image/peopleicon/ag娱乐.png"),
          award: 38,
          amount: 20000,
          effective_betting: 0,
          platform_name: "AG娱乐",
          status: -1,
        },
        {
          url: require("../../common/image/peopleicon/完美视讯.png"),
          award: 38,
          amount: 20000,
          effective_betting: 0,
          platform_name: "BG娱乐",
          status: -1,
        },
        {
          url: require("../../common/image/peopleicon/欧博娱乐.png"),
          award: 38,
          amount: 20000,
          effective_betting: 0,
          platform_name: "完美视讯",
          status: -1,
        },
        {
          url: require("../../common/image/peopleicon/ogplus.png"),
          award: 38,
          amount: 20000,
          effective_betting: 0,
          platform_name: "欧博娱乐",
          status: -1,
        },
        {
          url: require("../../common/image/peopleicon/evo真人.png"),
          award: 38,
          amount: 20000,
          effective_betting: 0,
          platform_name: "OG Plus",
          status: -1,
        },
        {
          url: require("../../common/image/peopleicon/万博实地厅.png"),
          award: 38,
          amount: 20000,
          effective_betting: 0,
          platform_name: "EVO真人",
          status: -1,
        },
        {
          url: require("../../common/image/peopleicon/cq9真人.png"),
          award: 38,
          amount: 20000,
          effective_betting: 0,
          platform_name: "万博实地厅",
          status: -1,
        },
        {
          url: require("../../common/image/peopleicon/bg娱乐.png"),
          award: 38,
          amount: 20000,
          effective_betting: 0,
          platform_name: "CQ9真人",
          status: -1,
        },
      ],
      // 棋牌
      chessimgList: [
        {
          url: require("../../common/image/chessicon/双赢棋牌.png"),
          award: 28,
          amount: 15000,
          effective_betting: 0,
          platform_name: "双赢棋牌",
          status: -1,
        },
        {
          url: require("../../common/image/chessicon/万博幸运棋牌.png"),
          award: 28,
          amount: 15000,
          effective_betting: 0,
          platform_name: "万博幸运棋牌",
          status: -1,
        },
        {
          url: require("../../common/image/chessicon/万博棋牌.png"),
          award: 28,
          amount: 15000,
          effective_betting: 0,
          platform_name: "万博棋牌",
          status: -1,
        },
        {
          url: require("../../common/image/chessicon/万博欢乐棋牌.png"),
          award: 28,
          amount: 15000,
          effective_betting: 0,
          platform_name: "万博欢乐棋牌",
          status: -1,
        },
      ],
      // 电子
      electimgList: [
        {
          url: require("../../common/image/electicon/sg电子.png"),
          award: 18,
          amount: 10000,
          effective_betting: 0,
          platform_name: "SG 电子",
          status: -1,
        },
        {
          url: require("../../common/image/electicon/AG游戏厅.png"),
          award: 18,
          amount: 10000,
          effective_betting: 0,
          platform_name: "AG游戏厅",
          status: -1,
        },
        {
          url: require("../../common/image/electicon/mg游戏.png"),
          award: 18,
          amount: 10000,
          effective_betting: 0,
          platform_name: "MG游戏厅",
          status: -1,
        },
        {
          url: require("../../common/image/electicon/pg游戏.png"),
          award: 18,
          amount: 10000,
          effective_betting: 0,
          platform_name: "PG游戏厅",
          status: -1,
        },
        {
          url: require("../../common/image/electicon/pp游戏.png"),
          award: 18,
          amount: 10000,
          effective_betting: 0,
          platform_name: "PP游戏厅",
          status: -1,
        },
        {
          url: require("../../common/image/electicon/万博电游.png"),
          award: 18,
          amount: 10000,
          effective_betting: 0,
          platform_name: "万博电游",
          status: -1,
        },
        {
          url: require("../../common/image/electicon/jdb游戏.png"),
          award: 18,
          amount: 10000,
          effective_betting: 0,
          platform_name: "JDB 夺宝电子",
          status: -1,
        },
        {
          url: require("../../common/image/electicon/cq9.png"),
          award: 18,
          amount: 10000,
          effective_betting: 0,
          platform_name: "CQ9游戏厅",
          status: -1,
        },
        {
          url: require("../../common/image/electicon/icg游戏.png"),
          award: 18,
          amount: 10000,
          effective_betting: 0,
          platform_name: "ICG游戏厅",
          status: -1,
        },
        {
          url: require("../../common/image/electicon/fc.png"),
          award: 18,
          amount: 10000,
          effective_betting: 0,
          platform_name: "FC游戏厅",
          status: -1,
        },
        {
          url: require("../../common/image/electicon/万博hw.png"),
          award: 18,
          amount: 10000,
          effective_betting: 0,
          platform_name: "万博HW电子",
          status: -1,
        },
      ],
      taskList: [
        { num: "≥5", amount: "20" },
        { num: "≥9", amount: "50" },
        { num: "≥15", amount: "100" },
      ],
      activityContent: {
        sub_week: { amount: 0 },
        week: { amount: 0 },
        activity: { count: 0, reward: 0 },
        is_time_out: "",
      },
      weekList: [],
      weekimmon: [],
      weekelect: [],
      weekchess: [],
      weeksubimmon: [],
      weeksubelect: [],
      weeksubchess: [],
      showWeek: "",
      nowWeek: "",
      subWeek: "",
      isWeek: true, //true本周，false上周
      dialogVisible: false,
      tipdialog: false,
      drawdialog: false,
      themedialog: false,
      initdialog: false,
      loading: "",

      onelistdata: [],
      twolistdata: [],

      moneyNum: "",
      getType: 1,

      onesearch: {
        page: 1,
        page_size: 10,
      },
      twosearch: {
        page: 1,
        page_size: 10,
      },
      onetotal: 0,
      twototal: 0,
    };
  },
  computed: {
    ...mapGetters(["username"]),
  },
  watch: {
    username: {
      handler(nv) {
        this.getheme();
      },
      deep: true,
      immediate: true,
    },
  },

  created() {
    window.setUserName = this.setUserName;
  },
  async mounted() {
    const isbro = judgeBrowser();
    if (isbro == "pc") {
      this.$router.replace(`/summer_pc`);
      return;
    }

    const _ = this;
    function isApp() {
      return !!window.xcjsmanager;
    }

    if (isApp()) {
      // eslint-disable-next-line no-undef
      xcFlutterJsSDk.request(
        // eslint-disable-next-line no-undef
        new XCJSRequestParam("common", "userinfo", null, function(response) {
          let username = response.loginName;

          const RE = /^d8100/;
          if (RE.test(username)) {
            username = username.substring(5);
          }
          username = setEncrypt(username);
          _.$username = username;
          _.$store.commit("SET_USERNAME", username);
          sessionStorage.setItem("username", username);
          return;
        })
      );
    }

    if (window.flutter_inappwebview) {
      window.flutter_inappwebview
        .callHandler("getUserName", "testData")
        .then((username) => {
          if (username) {
            sessionStorage.setItem("username", setEncrypt(username));
            _.$store.commit("SET_USERNAME", setEncrypt(username));
          }
        });
      return;
    }

    const username = getUsernameByPlatform();

    if (username) {
      sessionStorage.setItem("username", username);
      this.$username = username;
      this.$store.commit("SET_USERNAME", username);
    } else {
      // 异步获取用户名
      asyncGetUsernameByPlatform().then((username) => {
        if (username) {
          // 全栈登录
          sessionStorage.setItem("username", username);
          this.$username = username;
          this.$store.commit("SET_USERNAME", username);
        } else {
          this.getIOSUsername();
        }
      });
    }

    // 加载时显示loading
    // this.loading = this.$loading({
    //   lock: true,
    //   text: "Loading",
    //   spinner: "el-icon-loading",
    //   background: "rgba(0, 0, 0, 0.7)",
    // });

    let res = getMondayAndSunday();

    this.nowWeek = res.thisWeekMonday + "-" + res.thisWeekSunday;
    this.subWeek = res.lastWeekMonday + "-" + res.lastWeekSunday;
    this.showWeek = res.thisWeekMonday + "-" + res.thisWeekSunday;
  },
  destroyed() {
    sessionStorage.removeItem("isfirst");
  },
  methods: {
    toThousands,
    getIOSUsername() {
      const timer = setInterval(() => {
        if (window.webkit) {
          try {
            window.webkit.messageHandlers.getUserName.postMessage("userName");
            clearInterval(timer);
          } catch (e) {
            console.log(e);
          }
        }
      }, 1000);
    },
    localgo() {
      window.open(
        "https://jc.8manbet.net/mobile/#/?activityId=undefined",
        "_self"
      );
    },
    setUserName(val) {
      if (sessionStorage.username) {
        return;
      }
      if (val) {
        sessionStorage.setItem("username", setEncrypt(val));
        this.$username = setEncrypt(val);
        this.$store.commit("SET_USERNAME", setEncrypt(val));
      }
    },
    // 获取页面信息
    async getheme() {
      console.log("his.username", this.username);
      if (!this.username) {
        this.dialogVisible = true;
        this.weekimmon = this.peopleimgList;
        this.weekelect = this.chessimgList;
        this.weekchess = this.electimgList;

        this.weekList = this.peopleimgList;
        return;
      }

      await cumulativeTheme().then((res) => {
        console.log(res);
        if (res.code == 0) {
          // this.loading.close();
          if (!res.data) {
            this.dialogVisible = true;
            return;
          }
          let data = res.data;
          this.activityContent = data;
          let { week, sub_week } = data;
          // 当有可领取且在领取时间内，显示领取弹窗
          // if (week.amount > 0) {
          //   this.initdialog = true;
          // }

          let isfirst = sessionStorage.getItem("isfirst");
          console.log("isfirst", isfirst);
          if (isfirst == 1) {
            if (
              !data.is_time_out &&
              (sub_week.amount > 0 || data.activity.reward > 0)
            ) {
              this.initdialog = true;
              sessionStorage.setItem("isfirst", 2);
            }
          }

          // 本周数据
          this.ProcessThisWeek(week);
          // 上周数据
          this.ProcessSubWeek(sub_week);
        } else {
          this.$message({ type: "warning", message: res.message });
          // this.loading.close();
        }
      });
    },
    // 处理本周数据
    ProcessThisWeek(week) {
      let weekimmon = [],
        weekelect = [],
        weekchess = [];
      for (let key in week.data) {
        if (key == 1) {
          let immon = week.data[key];
          for (let idx in immon) {
            weekimmon.push(immon[idx]);
          }
        }
        if (key == 3) {
          let immon = week.data[key];
          for (let idx in immon) {
            weekchess.push(immon[idx]);
          }
        }
        if (key == 5) {
          let immon = week.data[key];
          for (let idx in immon) {
            weekelect.push(immon[idx]);
          }
        }
      }
      this.peopleimgList.forEach((val, i) => {
        weekimmon.forEach((item, j) => {
          if (i == j) {
            item.url = val.url;
            item.amount = 20000;
            item.award = 38;
          }
        });
      });
      this.chessimgList.forEach((val, i) => {
        weekelect.forEach((item, j) => {
          if (i == j) {
            item.url = val.url;
            item.amount = 15000;
            item.award = 28;
          }
        });
      });
      this.electimgList.forEach((val, i) => {
        weekchess.forEach((item, j) => {
          if (i == j) {
            item.url = val.url;
            item.amount = 10000;
            item.award = 18;
          }
        });
      });

      this.weekimmon = weekimmon;
      this.weekelect = weekelect;
      this.weekchess = weekchess;

      this.weekList = weekimmon;
    },
    // 处理上周数据
    ProcessSubWeek(week) {
      let weekimmon = [],
        weekelect = [],
        weekchess = [];
      for (let key in week.data) {
        if (key == 1) {
          let immon = week.data[key];
          for (let idx in immon) {
            // immon[idx].platform_name = "11" + immon[idx].platform_name;
            weekimmon.push(immon[idx]);
          }
        }
        if (key == 3) {
          let immon = week.data[key];
          for (let idx in immon) {
            // immon[idx].platform_name = "11" + immon[idx].platform_name;
            weekchess.push(immon[idx]);
          }
        }
        if (key == 5) {
          let immon = week.data[key];
          for (let idx in immon) {
            // immon[idx].platform_name = "11" + immon[idx].platform_name;
            weekelect.push(immon[idx]);
          }
        }
      }
      this.peopleimgList.forEach((val, i) => {
        weekimmon.forEach((item, j) => {
          if (i == j) {
            item.url = val.url;
            item.amount = 20000;
            item.award = 38;
          }
        });
      });
      this.chessimgList.forEach((val, i) => {
        weekelect.forEach((item, j) => {
          if (i == j) {
            item.url = val.url;
            item.amount = 15000;
            item.award = 28;
          }
        });
      });
      this.electimgList.forEach((val, i) => {
        weekchess.forEach((item, j) => {
          if (i == j) {
            item.url = val.url;
            item.amount = 10000;
            item.award = 18;
          }
        });
      });

      this.weeksubimmon = weekimmon;
      this.weeksubelect = weekelect;
      this.weeksubchess = weekchess;
      console.log("this.weeksubimmon", this.weeksubimmon);
    },
    // 切换tab
    changetab(index) {
      if (!this.username) {
        this.weeksubimmon = this.peopleimgList;
        this.weeksubelect = this.chessimgList;
        this.weeksubchess = this.electimgList;

        // this.weekList = this.peopleimgList;
        // return;
      }
      this.action = index;
      this.weekList = [];
      let {
        isWeek,
        weekimmon,
        weekelect,
        weekchess,
        weeksubimmon,
        weeksubelect,
        weeksubchess,
      } = this;

      if (index == 1) {
        this.weekList = isWeek ? weekimmon : weeksubimmon;
      }
      if (index == 3) {
        this.weekList = isWeek ? weekelect : weeksubelect;
      }
      if (index == 5) {
        this.weekList = isWeek ? weekchess : weeksubchess;
      }
      console.log("weekList", this.weekList);
    },

    // 切换到上一周
    changeSubWeek() {
      this.showWeek = this.subWeek;
      this.isWeek = false;
      this.changetab(this.action);
    },
    // 切换到本周
    changeNowWeek() {
      this.showWeek = this.nowWeek;
      this.isWeek = true;
      this.changetab(this.action);
    },
    // 返回顶部
    backTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    getThisWeek(num, type) {
      if (!this.username) {
        this.dialogVisible = true;
        return;
      }
      if (!num) {
        this.$message({ type: "warning", message: "暂时没有可领取的彩金哦～" });
        return;
      }
      this.getType = type;
      this.tipdialog = true;
      this.moneyNum = num;
    },
    // 领取本周彩金
    confirm() {
      if (!this.username) {
        this.dialogVisible = true;
        return;
      }
      if (this.getType == 1) {
        getNowWeekMoney().then((res) => {
          if (res.code == 0) {
            this.$message({ type: "success", message: "领取成功" });
            this.getheme();
            this.tipdialog = false;
          } else {
            this.$message({ type: "warning", message: res.message });
            this.tipdialog = false;
          }
        });
      } else if (this.getType == 2) {
        getSubWeekMoney().then((res) => {
          console.log(res);
          if (res.code == 0) {
            this.$message({ type: "success", message: "领取成功" });
            this.getheme();
            this.tipdialog = false;
          } else {
            this.$message({ type: "warning", message: res.message });
            this.tipdialog = false;
          }
        });
      } else if (this.getType == 3) {
        getAwardCommen().then((res) => {
          if (res.code == 0) {
            this.$message({ type: "success", message: "领取成功" });
            this.getheme();
            this.tipdialog = false;
          } else {
            this.$message({ type: "warning", message: res.message });
            this.tipdialog = false;
          }
        });
      }
    },
    // 主题一分页
    handleSizeChange(val) {
      console.log(111, val);
      this.onesearch.page = val;
      this.getinfo();
    },
    //  主题二分页
    handleCurrentChange(val) {
      console.log(222, val);
      this.twosearch.page = val;
      this.getTwoinfo();
    },

    // 打开派发记录
    getRecive(type) {
      if (!this.username) {
        this.dialogVisible = true;
        return;
      }
      if (type == 1) {
        this.getinfo();
        this.drawdialog = true;
      }
      if (type == 2) {
        this.getTwoinfo();
        this.themedialog = true;
      }
    },
    // 主题一派发记录
    async getinfo() {
      await getReceiveList(this.onesearch).then((res) => {
        console.log(res);
        this.onelistdata = res.data.data;
        this.onetotal = res.data.total;
        // this.drawdialog = true;
      });
    },
    // 主题二派发记录
    async getTwoinfo() {
      await getThemeList(this.twosearch).then((res) => {
        console.log(res);
        this.twolistdata = res.data.data;
        this.twototal = res.data.total;
        // this.themedialog = true;
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
r2(designpx) {
  $rem = 37.5px;
  return (designpx / $rem) rem;
}

.pc_container {
  width: 100vw;
  height: r2(3223);
  font-family: Arial;
  background-image: url('../../common/img/bjda@2x.png');
  background-size: 100%;
  background-repeat: no-repeat;

  .allbox {
    width: r2(750);
    margin: 0 auto;
    padding-top: r2(325);

    .rowbox {
      width: r2(710);
      margin-left: r2(20);
      display: flex;
      justify-content: space-between;

      .actinfo {
        width: r2(230);
        height: r2(74);
        background-image: url('../../common/img/titlebg.png');
        background-size: 100%;
        background-repeat: no-repeat;
        text-align: center;

        .time {
          font-size: r2(24);
          font-weight: 600;
          color: #ffffff;
          margin-top: r2(12);
          margin-bottom: r2(4);
        }

        .date {
          font-size: r2(18);
          font-weight: 400;
          font-stretch: normal;
          color: #ffffff;
        }
      }
    }

    .titlebox {
      width: r2(723);
      height: r2(149);
      margin: 0 auto;
      margin-top: r2(63);
      background-image: url('../../common/img/infobg.png');
      background-size: 100%;
      background-repeat: no-repeat;

      .actcon {
        width: r2(723);
        text-align: center;
        font-size: r2(24);
        color: #FFFFFF;
        font-weight: 600;
        padding-top: r2(23);
        padding-bottom: r2(5);
      }

      .actinfo {
        margin: 0 auto;
        width: r2(665);
        font-size: r2(20);
        color: #FFFFFF;
        letter-spacing: 0;
        font-weight: 400;
        line-height: r2(25);
      }
    }

    .themeone {
      width: r2(750);
      height: r2(1110);
      background-image: url('../../common/img/centerbg.png');
      background-size: 100%;
      background-repeat: no-repeat;
      margin-top: r2(43);

      .onetitle {
        width: r2(600);
        font-size: r2(20);
        line-height: r2(30);
        color: #EBFA03;
        margin: 0 auto;
        padding-top: r2(14);
      }

      .datecheck {
        width: r2(460);
        height: r2(45);
        line-height: r2(45);
        background-image: url('../../common/image/cicle.png');
        background-size: 100%;
        background-repeat: no-repeat;
        margin: 0 auto;
        margin-top: r2(45);
        display: flex;
        justify-content: space-between;

        .triangle {
          margin-left: r2(10);
          margin-top: r2(8);
          height: 0px;
          width: 0px;
          border: r2(14) solid #000;
          border-top-color: transparent;
          border-bottom-color: transparent;
          border-left-color: transparent;
          border-right-color: #faeb03;
        }

        .blue {
          border-right-color: #92c6f1;
        }

        .riqi {
          font-size: r2(20);
          color: #0749b1;
        }

        .trangle {
          margin-right: r2(10);
          margin-top: r2(8);
          height: 0px;
          width: 0px;
          border: r2(14) solid #000;
          border-top-color: transparent;
          border-bottom-color: transparent;
          border-left-color: #92c6f1;
          border-right-color: transparent;
        }

        .yellow {
          border-left-color: #faeb03;
        }
      }

      .tabs {
        display: flex;
        justify-content: space-between;
        width: r2(642);
        margin: 0 auto;
        margin-top: r2(20);

        .tab {
          width: r2(204);
          height: r2(46);
          background-image: linear-gradient(1deg, #3182fb 0%, #8ebbfb 0%, #ebf3fa 0%, #67d7fc 100%), linear-gradient(#ffffff, #ffffff);
          box-shadow: r2(1) r2(2) r2(6) 0px rgba(1, 34, 62, 0.42);
          border-radius: r2(8);
          font-size: r2(24);
          line-height: r2(50);
          color: #0454a9;
          text-align: center;
        }

        .active {
          background-image: linear-gradient(-36deg, #F4D736 0%, #FCED00 51%, #A0EEE6 100%);
          box-shadow: 0 r2(2) r2(8) 0 rgba(1, 34, 62, 0.5);
        }
      }

      .table {
        width: r2(648);
        min-height: r2(644);
        margin: 0 auto;
        margin-top: r2(15);

        .theader {
          display: flex;

          div {
            text-align: center;
            font-size: r2(24);
            color: #ffffff;
            height: r2(50);
            line-height: r2(50);
          }

          .hone {
            width: r2(212);
          }

          .htwo {
            width: r2(230);
          }

          .hthree {
            width: r2(80);
          }

          .hfour {
            width: r2(120);
          }
        }

        .tbody {
          // margin
          .bodyrow {
            display: flex;
            margin-bottom: r2(4);

            &>div {
              text-align: center;
              font-size: r2(20);
              color: #ffffff;
              height: r2(50);
              line-height: r2(50);
              background-color: rgba(255, 255, 255, 0.3);
              margin-right: r2(1);
            }

            .tone {
              width: r2(212);
              display: flex;

              .imgbox {
                margin-left: r2(5);
                margin-right: r2(5);
                margin-top: r2(5);
                width: r2(40);
                height: r2(45);
                overflow: hidden;
                display: flex;
                justify-content: center;

                img {
                  width: auto;
                  height: r2(50);
                  display: block;
                  text-align: center;
                }
              }

              .text {
                color: #fff;
              }
            }

            .ttwo {
              width: r2(230);
              position: relative;

              .el-progress {
                margin: 0 auto;
                width: r2(210);
                margin-top: r2(9);
              }

              /deep/ .el-progress-bar__outer {
                background-color: #f1fbfe;
                height: r2(32) !important;
              }

              /deep/ .el-progress-bar__innerText {
                display: none;
                color: #0454a9;
                font-size: r2(20);
              }

              .newnum {
                width: r2(210);
                text-align: center;
                top: 0;
                left: r2(10);
                color: #0454a9;
                font-size: r2(18);
                position: absolute;
              }
            }

            .tthree {
              width: r2(80);
            }

            .tfour {
              width: r2(120);
            }
          }
        }
      }

      .getbox {
        display: flex;
        justify-content: space-between;
        width: r2(632);
        margin: 0 auto;
        margin-top: r2(28);

        .mountbox {
          .able {
            display: flex;
            margin-bottom: r2(12);

            .avai {
              width: r2(290);
              height: r2(50);
              line-height: r2(50);
              background-image: linear-gradient(1deg, #3182fb 0%, #8ebbfb 0%, #ebf3fa 0%, #67d7fc 100%), linear-gradient(#3e8ae1, #3e8ae1);
              box-shadow: r2(1) r2(2) r2(6) 0px rgba(1, 34, 62, 0.42);
              border-radius: r2(8);
              color: #0454a9;
              font-size: r2(24);
              padding-left: r2(20);
            }

            .get {
              width: r2(150);
              height: r2(50);
              line-height: r2(0);
              background-image: linear-gradient(-8deg, #f4d736 0%, #fced00 51%, #a0eee6 100%), linear-gradient(#faeb03, #faeb03);
              box-shadow: r2(1) r2(2) r2(6) 0px rgba(0, 32, 59, 0.42);
              border-radius: r2(8);
              border: solid r2(4) rgba(255, 255, 255, 0.25);
              text-align: center;
              color: #0454a9;
              font-size: r2(24);
              margin-left: r2(15);
            }

            .is-disabled {
              background: #f4d736 !important;
              opacity: 0.6 !important;
            }

            .draw {
              width: r2(150);
              height: r2(50);
              border-radius: r2(8);
              line-height: r2(0);
              // background:#f1fbfe
              text-align: center;
              color: #0454a9;
              font-size: r2(24);
              margin-left: r2(15);
              background-image: linear-gradient(-8deg, #f4d736 0%, #fced00 51%, #a0eee6 100%), linear-gradient(#faeb03, #faeb03);
              box-shadow: r2(1) r2(2) r2(6) 0px rgba(0, 32, 59, 0.42);
            }
          }
        }

        .record {
          width: r2(150);
          height: r2(50);
          line-height: r2(0);
          background-color: rgba(62, 138, 225, 0.9);
          border-radius: r2(8);
          border: solid r2(1) #a0cef5;
          font-size: r2(24);
          color: #fff;
          text-align: center;
          margin-top: r2(62);
        }
      }
    }

    .themetwo {
      width: r2(750);
      height: r2(544);
      background-image: url('../../common/img/botbg.png');
      background-size: 100%;
      background-repeat: no-repeat;
      margin-top: r2(76);

      .twotitle {
        width: r2(600);
        font-size: r2(20);
        line-height: r2(25);
        color: #EBFA03;
        margin: 0 auto;
        padding-top: r2(15);
      }

      .table {
        margin-top: r2(30);
        margin-left: r2(45);

        .theader {
          display: flex;

          div {
            text-align: center;
            font-size: r2(20);
            color: #ffffff;
            height: r2(50);
            line-height: r2(50);
          }

          .hone {
            width: r2(270);
            margin-right: r2(2);
          }

          .htwo {
            width: r2(198);
          }
        }

        .tbody {
          .bodyrow {
            display: flex;
            margin-bottom: r2(10);

            &>div {
              text-align: center;
              font-size: r2(20);
              color: #ffffff;
              height: r2(50);
              line-height: r2(50);
              background-color: rgba(255, 255, 255, 0.3);
              margin-right: r2(2);
            }

            .tone {
              width: r2(270);
              margin-right: r2(2);
            }

            .ttwo {
              width: r2(198);
            }
          }
        }
      }

      .mountbox {
        width: r2(506);
        margin-left: r2(45);
        margin-top: r2(23);

        .able {
          display: flex;
          margin-bottom: r2(16);

          .avai {
            width: r2(330);
            height: r2(50);
            line-height: r2(50);
            background-image: linear-gradient(1deg, #3182fb 0%, #8ebbfb 0%, #ebf3fa 0%, #67d7fc 100%), linear-gradient(#3e8ae1, #3e8ae1);
            box-shadow: r2(1) r2(2) r2(6) 0px rgba(1, 34, 62, 0.42);
            border-radius: r2(8);
            color: #0454a9;
            font-size: r2(24);
            padding-left: r2(10);
          }

          .get {
            width: r2(150);
            height: r2(50);
            line-height: r2(0);
            background-image: linear-gradient(-8deg, #f4d736 0%, #fced00 51%, #a0eee6 100%), linear-gradient(#faeb03, #faeb03);
            box-shadow: r2(1) r2(2) r2(6) 0px rgba(0, 32, 59, 0.42);
            border-radius: r2(8);
            border: solid r2(4) rgba(255, 255, 255, 0.25);
            text-align: center;
            color: #0454a9;
            font-size: r2(24);
            margin-left: r2(15);
          }

          .is-disabled {
            background: #f4d736 !important;
            opacity: 0.6 !important;
          }

          .draw {
            width: r2(150);
            height: r2(50);
            border-radius: r2(8);
            line-height: r2(0);
            background: rgba(62, 138, 225, 0.9);
            text-align: center;
            color: #fff;
            font-size: r2(24);
            margin-left: r2(15);
            border: solid r2(1) #a0cef5;
          }
        }
      }
    }

    .rulebox {
      width: r2(720);
      margin: 0 auto;
      margin-top: r2(35);

      img {
        width: r2(455);
        height: r2(90);
        margin: 0 auto;
        text-align: center;
        display: block;
      }

      .ruletext {
        font-size: r2(30);
        color: #ffffff;
        font-weight: bold;
        width: r2(455);
        margin: 0 auto;
        text-align: center;
        margin-top: r2(-55);
      }

      .content {
        margin-top: r2(15);
        width: r2(720);
        background-color: rgba(10, 81, 141, 0.6);
        border-radius: r2(16);
        padding: r2(18) r2(20);

        p {
          font-size: r2(20);
          color: #fff;
          // font-weight:bold
          margin-bottom: r2(20);
          line-height: r2(35);
        }

        .kind {
          font-size: r2(20);
          color: #fff;
          margin-bottom: r2(9);
          line-height: r2(35);
        }

        .mr {
          margin-top: r2(18);
          color: #fff;
          font-size: r2(20);

          span {
            color: #faec04;
          }
        }
      }
    }

    .btns {
      width: r2(750);
      display: flex;
      justify-content: center;
      margin-top: r2(50);

      div {
        width: r2(280);
        height: r2(66);
        line-height: r2(66);
        text-align: center;
        background-image: linear-gradient(1deg, #3182fb 0%, #8ebbfb 0%, #ebf3fa 0%, #67d7fc 100%), linear-gradient(0deg, #2c85f5 0%, #0cb3f8 100%);
        box-shadow: r2(1) r2(2) r2(6) 0px rgba(1, 34, 62, 0.42);
        border-radius: r2(10);
        color: #0454a9;
        font-size: r2(24);
      }
    }
  }
}

.model-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;

  .modelveng {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .modeltable {
    position: absolute;
    width: 100%;
    height: r2(425);
    z-index: 22;
    // left:20%
    top: 20%;

    .bkg {
      position: relative;
      margin: 0 auto;
      width: r2(554);
      height: r2(425);
      background-image: url('../../common/image/dialog1.png');
      background-size: 100%;
      background-repeat: no-repeat;

      .modeltitle {
        position: absolute;
        font-size: r2(36);
        line-height: r2(15);
        color: #ffffff;
        box-shadow: r2(1) r2(2) r2(10) 0px rgba(0, 150, 234, 0.75);
        top: r2(220);
        left: r2(140);
      }

      .modelcontent {
        position: absolute;
        font-size: r2(28);
        line-height: r2(40);
        color: #ffffff;
        width: r2(351);
        text-align: center;
        top: r2(289);
        left: r2(101.5);
      }

      .dele {
        position: absolute;
        top: r2(175);
        right: r2(13);
        width: r2(50);
        height: auto;
        // left:50%;
        // margin-left:r2(-30)
      }
    }
  }
}

.back_box {
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 22;

  .post {
    width: r2(580);
    height: r2(352);
    background: rgba(225, 225, 225, 0.33);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: r2(10);

    .cbg {
      width: r2(550);
      height: r2(322);
      background-image: linear-gradient(-8deg, #0a6fd7 0%, #1e79e9 0%, #3182fb 0%, #05bbf7 100%), linear-gradient(#ffffff, #ffffff);
      border-radius: r2(10);
    }

    .modeltitle {
      font-size: r2(36);
      line-height: r2(15);
      color: #ebfa03;
      box-shadow: r2(1) r2(2) r2(10) 0px rgba(0, 150, 234, 0.75);
      width: r2(550);
      text-align: center;
      margin-top: r2(40);
    }

    .modelcontent {
      font-size: r2(28);
      height: r2(100);
      line-height: r2(50);
      color: #ffffff;
      width: r2(510);
      text-align: center;
      margin-top: r2(40);
      padding-left: r2(20);
    }

    .btns {
      padding: 0 r2(30);
      margin-top: r2(40);
      display: flex;
      justify-content: space-between;
      font-size: r2(24);

      div {
        width: r2(190);
        height: r2(60);
        line-height: r2(60);
        text-align: center;
        background-image: linear-gradient(1deg, #3182fb 0%, #8ebbfb 0%, #ebf3fa 0%, #67d7fc 100%), linear-gradient(#faeb03, #faeb03);
        box-shadow: r2(1) r2(2) r2(6) 0px rgba(1, 34, 62, 0.42);
        border-radius: r2(8);
        color: #0454a9;
      }

      .cans {
        background: #fff;
      }
    }

    .center {
      justify-content: center;
    }
  }
}

.login_box {
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 22;

  .post {
    width: r2(720);
    height: auto;
    position: relative;
    text-align: center;

    .close {
      width: r2(45);
      height: auto;
      position: absolute;
      right: 0;
      top: r2(-90);
    }

    .back {
      position: absolute;
      width: r2(566);
      height: r2(130);
      top: r2(-105);
      left: r2(77);
    }

    .title {
      position: absolute;
      font-size: r2(30);
      color: #ebfa03;
      width: r2(720);
      text-align: center;
      top: r2(-40);
      letter-spacing: r2(5);
    }

    .container {
      background-color: rgba(255, 255, 255, 0.33);
      border-radius: r2(10);
      width: r2(720);
      min-height: r2(582);
      display: flex;
      justify-content: center;
      align-items: center;

      .consbox {
        width: r2(690);
        min-height: r2(552);
        background-image: linear-gradient(-8deg, #0a6fd7 0%, #1e79e9 0%, #3182fb 0%, #05bbf7 100%), linear-gradient(#ffffff, #ffffff);
        border-radius: r2(10);

        .table {
          width: 100%;
          // height:r2(600);
          color: #fff;
          overflow: auto;
          padding: r2(20);

          .header {
            display: flex;
            justify-content: space-between;
            height: r2(44);
            line-height: r2(44);
            margin-bottom: r2(2);

            div {
              width: 24.8%;
              text-align: center;
              font-size: r2(20);
              background-color: rgba(3, 45, 91, 0.18);
              margin-right: r2(2);
            }

            .one {
              width: r2(85);
            }

            .two {
              width: r2(226);
            }

            .three {
              width: r2(304);
            }

            .four {
              width: r2(110);
            }

            .five {
              width: r2(160);
            }
          }

          .body {
            display: flex;
            justify-content: space-between;
            height: r2(44);
            line-height: r2(44);
            margin-bottom: r2(2);

            div {
              width: 24.8%;
              text-align: center;
              font-size: r2(18);
              background-color: rgba(3, 45, 91, 0.18);
              margin-right: r2(2);
            }

            .one {
              width: r2(85);
            }

            .two {
              width: r2(226);
            }

            .three {
              width: r2(304);
            }

            .four {
              width: r2(110);
            }

            .five {
              width: r2(160);
            }
          }

          .pone {
            width: 11% !important;
          }

          .ptwo {
            width: 35% !important;
          }

          .pthree {
            width: 35% !important;
          }

          .pfour {
            width: 18% !important;
          }
        }

        .el-pagination {
          color: #fff !important;
        }

        /deep/ .el-pagination button:disabled {
          background: transparent !important;
          color: yellow;
        }

        /deep/ .el-pager li.active {
          color: yellow;
          font-weight: bold;
        }

        /deep/ .btn-next {
          background-color: transparent !important;
          color: #fff;
        }

        /deep/ .btn-prev {
          background-color: transparent !important;
          color: #fff;
        }

        /deep/ .el-pager li {
          background: transparent !important;
          color: #fff;
        }
      }
    }
  }
}

.point {
  cursor: pointer;
}

.none {
  background-image: none !important;
  background-color: #fff;
}

/* 定义一个闪烁动画 */
@keyframes blink {
  0% {
    opacity: 1;
    // width: r2(190);
    // height: r2(61);
  }

  50% {
    opacity: 0.3;
    // width: r2(220);
    // height: r2(81);
  }

  100% {
    opacity: 1;
    // width: r2(190);
    // height: r2(61);
  }
}

/* 定义按钮样式 */
.twink {
  animation: blink 0.5s infinite; /* 添加闪烁动画效果 */
}

/* 鼠标悬浮时停止闪烁 */
.twink:hover {
  animation-play-state: paused;
  opacity: 1;
}
</style>
