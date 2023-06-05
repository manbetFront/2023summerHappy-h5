<template>
  <div class="pc_container" ref="home">
    <img class="logo" src="../../common/image/logo.png" />
    <div class="allbox">
      <div class="rowbox">
        <div class="actinfo">
          <div class="time">【活动时间】</div>
          <div class="date">2023年06月26日 – 2023年07月30日</div>
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
        <img src="../../common/image/title.png" />
      </div>

      <div class="themeone">
        <div class="onetitle">
          主题一：活动期间会员自然周内于真人、棋牌或电子任意单一平台投注，累计有效投注达以下要求，即可获得对应彩金奖励，完成平台数越多奖励越多。<br />
          <span style="color:red"
            >小贴士：符合即可领取，领取期限至次周周二23:59:59。</span
          >
        </div>
        <div class="datecheck">
          <img
            class="left point"
            v-if="isWeek"
            src="../../common/image/jiantouleft.png"
            @click="changeSubWeek"
          />
          <img
            class="left point"
            v-else
            @click="changeSubWeek"
            src="../../common/image/grayleft.png"
          />
          <div class="riqi">自然周：{{ showWeek }}</div>

          <img
            class="right point"
            v-if="!isWeek"
            @click="changeNowWeek"
            src="../../common/image/jiantouright.png"
          />
          <img
            class="right point"
            @click="changeNowWeek"
            v-else
            src="../../common/image/grayright.png"
          />
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
                <img :src="item.url" />
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
                <div v-if="item.status == 0">
                  {{ isWeek ? "进行中" : "未完成" }}
                </div>
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
          主题二：自然周内完成主题一指定任务平台数≥5个，还可获得额外活跃嘉奖。<br />
          <span style="color:red">小贴士：领取期限至当周周二23:59:59。</span>
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
              已完成指定任务平台数：{{ activityContent.activity.count }}个
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
        <img src="../../common/image/rule.png" />
        <div class="ruletext">领取方式</div>
        <div class="content">
          <p style="margin-bottom:0">
            获得彩金奖励的会员，点击领取后系统将自动派发至您的游戏账户，届时请您查收。
          </p>
        </div>
      </div>
      <div class="rulebox">
        <img src="../../common/image/rule.png" />
        <div class="ruletext">温馨提示</div>
        <div class="content">
          <span>
            1、本优惠主题一每自然周指定子平台符合投注要求皆可领取一次，领取期限至次周周二23:59:59。<br />

            2、本优惠主题二每周一根据上一自然周达成的最高条件进行统计，领取期限至当周周二23:59:59。<br />

            3、本优惠所获的彩金奖励需会员手动点击进行领取，如在限定时间内未领取将视为放弃，无法补发。<br />

            4、本优惠所获彩金仅需在真人、棋牌或电子平台（不含捕鱼）完成五倍流水方可提款。<br />

            5、本优惠所需投注不与其他投注活动共享，可与返水活动共享。<br />

            6、本优惠仅对已结算并产生输赢结果的投注流水进行计算。所有拒绝投注，无效投注，打平，任何出现对押情况的投注（例：于百家乐同时下注庄家及闲家，百家乐当中开和退还本金）将不予计算。<br />
          </span>
          <div class="mr">
            本优惠遵循ManBetX万博<span class="point" @click="localgo"
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
      <div class="modeltable" :style="{ top: top + 'px' }">
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
      <div class="modeltable" :style="{ top: top + 'px' }">
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
      <div class="back_box modeltable" :style="{ top: top + 'px' }">
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
    <!-- 没有可领取的彩金 -->
    <div v-show="nonedialog" class="model-box">
      <div class="modelveng" @click="nonedialog = false"></div>
      <div class="back_box modeltable" :style="{ top: top + 'px' }">
        <div class="post">
          <div class="cbg">
            <div class="modeltitle">温馨提示</div>
            <div class="modelcontent">暂时没有可领取的彩金哦~</div>
            <div class="btns center">
              <div class="point" @click="nonedialog = false">确认</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="drawdialog" class="model-box">
      <div class="modelveng" @click="drawdialog = false"></div>
      <div class="login_box" :style="{ top: top + 'px' }">
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
                  <div class="two">完成任务平台名称</div>
                  <div class="three">领取时间</div>
                  <div class="four">金额</div>
                  <div class="five">状态</div>
                </div>
                <div v-if="onelistdata.length > 0">
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
                          : item.status == 2
                          ? "已领取"
                          : item.status == 3
                          ? "已过期"
                          : ""
                      }}
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="nothing">暂无数据</div>
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
      <div class="login_box" :style="{ top: top + 'px' }">
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
                  <div>序号</div>
                  <div>额外活跃嘉奖彩金</div>
                  <div>领取时间</div>
                  <div>状态</div>
                </div>
                <div v-if="twolistdata.length > 0">
                  <div class="body" v-for="(item, i) in twolistdata" :key="i">
                    <div>{{ i + 1 }}</div>
                    <div>{{ item.amount }}</div>
                    <div>
                      {{ item.draw_time ? item.draw_time : "-" }}
                    </div>
                    <div>
                      {{
                        item.status == 1
                          ? "待领取"
                          : item.status == 2
                          ? "已领取"
                          : item.status == 3
                          ? "已过期"
                          : ""
                      }}
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="nothing">暂无数据</div>
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

    <div v-show="successdialog" class="model-box">
      <div class="success" :style="{ top: top + 'px' }">
        <i class="el-icon-success"></i>
        <div>领取成功</div>
      </div>
    </div>
    <!-- <div class="success" v-show="successdialog" :style="{ top: top + 'px' }">
      <i class="el-icon-success"></i>
      <div>领取成功</div>
    </div> -->
    <div v-show="errordialog" class="model-box">
      <div class="warning" :style="{ top: top + 'px' }">
        <i class="el-icon-warning"></i>
        <div>{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Progress, Table, Button, Pagination } from "element-ui";
Vue.use(Progress)
  .use(Table)
  .use(Pagination);

import {
  _debounce,
  getMondayAndSunday,
  judgeBrowser,
  toThousands,
} from "@/utils";
import { mapGetters } from "vuex";

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
        // {
        //   url: require("../../common/image/electicon/icg游戏.png"),
        //   award: 18,
        //   amount: 10000,
        //   effective_betting: 0,
        //   platform_name: "ICG游戏厅",
        //   status: -1,
        // },
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
      nonedialog: false,
      successdialog: false,
      errordialog: false,

      message: "",
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
      top: 125,
      isStart: true,
    };
  },
  computed: {
    ...mapGetters(["username"]),
  },
  beforeCreate() {
    const isbro = judgeBrowser();
    if (isbro == "h5") {
      this.$router.push({
        path: "/summer_h5" + window.location.search,
      });
      return;
    }
  },
  created() {},
  async mounted() {
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

    this.receiveIframe();
    this.getheme();

    this.backTop();
  },
  destroyed() {
    sessionStorage.removeItem("isfirst");
  },

  methods: {
    toThousands,
    localgo() {
      window.open(
        "https://cn.manbet177.com/home/guidancecontent?t=promo&q=6 ",
        "_self"
      );
    },
    // 获取页面信息
    async getheme() {
      console.log("this.username", this.username);
      if (!this.username) {
        // this.dialogVisible = true;
        this.weekimmon = this.peopleimgList;
        this.weekelect = this.chessimgList;
        this.weekchess = this.electimgList;
        this.weekList = this.peopleimgList;
        return;
      }
      try {
        const { code, data } = await cumulativeTheme();
        let content = data; // data 有值 说明返回成功 没有返回data
        if (code == 0) {
          // 第一次 应该都有值
          if (!content) {
            content = localStorage.data;
            // 如果没有值
            if (!content) {
              this.weekimmon = this.peopleimgList;
              this.weekelect = this.chessimgList;
              this.weekchess = this.electimgList;
              this.weekList = this.peopleimgList;
            } else {
              this.indexHelper(JSON.parse(localStorage.data));
            }
          } else {
            localStorage.setItem("data", JSON.stringify(content));
            this.indexHelper(content);
          }
        } else {
          localStorage.data && this.indexHelper(JSON.parse(localStorage.data));
          this.isStart = false;
          this.weekimmon = this.peopleimgList;
          this.weekelect = this.chessimgList;
          this.weekchess = this.electimgList;
          this.weekList = this.peopleimgList;
        }
      } catch (e) {
        console.log(e);
        localStorage.data && this.indexHelper(JSON.parse(localStorage.data));
      }
    },

    indexHelper(content) {
      this.activityContent = content;
      let { week, sub_week } = content;

      let isfirst = sessionStorage.getItem("isfirst");

      if (isfirst == 1) {
        if (
          !content.is_time_out &&
          (sub_week.amount > 0 || content.activity.reward > 0)
        ) {
          this.initdialog = true;
          sessionStorage.setItem("isfirst", 2);
        }
        // 当有可领取且在领取时间内，显示领取弹窗
        if (week.amount > 0) {
          this.initdialog = true;
          sessionStorage.setItem("isfirst", 2);
        }
      }

      // 本周数据
      this.ProcessThisWeek(week);
      // 上周数据
      this.ProcessSubWeek(sub_week);
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
      if (!this.username || !this.isStart) {
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
      this.$nextTick(() => {
        this.$refs.home &&
          this.$refs.home.scrollIntoView({ behavior: "smooth" });
      });
    },
    getThisWeek: _debounce(function(num, type) {
      if (!this.username) {
        this.dialogVisible = true;
        return;
      }
      if (!num) {
        this.nonedialog = true;
        // this.$message({ type: "warning", message: "暂时没有可领取的彩金哦～" });
        return;
      }
      this.getType = type;
      this.tipdialog = true;
      this.moneyNum = num;
    }, 800),
    // 领取本周彩金
    confirm() {
      if (!this.username) {
        this.dialogVisible = true;
        return;
      }
      if (this.getType == 1) {
        getNowWeekMoney().then((res) => {
          if (res.code == 0) {
            // this.$message({ type: "success", message: "领取成功" });
            this.getsuccess();
            this.getheme();
            this.tipdialog = false;
          } else {
            this.message = res.message;
            this.getwarning();
            // this.$message({ type: "warning", message: res.message });
            this.tipdialog = false;
          }
        });
      } else if (this.getType == 2) {
        getSubWeekMoney().then((res) => {
          console.log(res);
          if (res.code == 0) {
            this.getsuccess();
            // this.$message({ type: "success", message: "领取成功" });
            this.getheme();
            this.tipdialog = false;
          } else {
            this.message = res.message;
            this.getwarning();
            // this.$message({ type: "warning", message: res.message });
            this.tipdialog = false;
          }
        });
      } else if (this.getType == 3) {
        getAwardCommen().then((res) => {
          if (res.code == 0) {
            this.getsuccess();
            // this.$message({ type: "success", message: "领取成功" });
            this.getheme();
            this.tipdialog = false;
          } else {
            this.message = res.message;
            this.getwarning();
            // this.$message({ type: "warning", message: res.message });
            this.tipdialog = false;
          }
        });
      }
    },

    // 领取成功提示
    getsuccess() {
      this.successdialog = true;
      setTimeout(() => {
        this.successdialog = false;
      }, 2500);
    },
    // 领取失败提示
    getwarning() {
      this.errordialog = true;
      setTimeout(() => {
        this.errordialog = false;
      }, 2500);
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
        this.onelistdata = res.data.data;
        this.onetotal = res.data.total;
      });
    },
    // 主题二派发记录
    async getTwoinfo() {
      await getThemeList(this.twosearch).then((res) => {
        this.twolistdata = res.data.data;
        this.twototal = res.data.total;
      });
    },

    receiveIframe() {
      let _ = this;
      window.addEventListener(
        "message",
        function(e) {
          _.getTop(e);
        },
        false
      );
    },
    getTop: _debounce(function(e) {
      this.top = 125;
      if (e.data && e.data.type === "scroll") {
        this.top = Number(e.data.scrollTop) + 30;
        if (this.top > 3800) return;
      } else {
      }
    }, 500),
  },
};
</script>

<style lang="stylus" scoped>
r(designpx) {
  $rem = 37.5px;
  return (designpx / $rem) rem;
}

r2(val) {
  return (val / 16) rem;
}

.pc_container {
  width: 100vw;
  height: r2(4040);
  font-family: Arial;
  background-image: url('../../common/image/bj.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
  overflow-x: hidden;

  .logo {
    width: r2(281);
    height: r2(64);
    margin-left: r2(363);
    margin-top: r2(20);
  }

  .allbox {
    width: r2(1279);
    margin: 0 auto;
    margin-top: r2(660);

    .rowbox {
      padding: 0 r2(50);
      display: flex;
      justify-content: space-between;

      .actinfo {
        width: r2(343);
        height: r2(127);
        background-image: url('../../common/image/timebg.png');
        background-size: 100%;
        background-repeat: no-repeat;
        text-align: center;

        .time {
          font-size: r2(24);
          font-weight: 600;
          font-stretch: normal;
          color: #ffffff;
          margin-top: r2(31);
          margin-bottom: r2(15);
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
      width: r2(1201);
      height: r2(184);
      margin: 0 auto;
      margin-top: r2(30);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .themeone {
      width: r2(1279);
      height: r2(1453);
      background-image: url('../../common/image/centerbg.png');
      background-size: 100%;
      background-repeat: no-repeat;
      // margin-top: r2(43);

      .onetitle {
        width: r2(965);
        font-size: r2(22);
        line-height: r2(30);
        color: #ebfa03;
        margin: 0 auto;
        padding-left: r2(40);
        padding-top: r2(60);
      }

      .datecheck {
        width: r2(453);
        height: r2(44);
        line-height: r2(44);
        background-image: url('../../common/image/cicle.png');
        background-size: 100%;
        background-repeat: no-repeat;
        margin: 0 auto;
        margin-top: r2(80);
        display: flex;
        justify-content: space-between;

        img{
          width:r2(22)
          height:r2(25)
          margin-top:r2(10)
        }
        .left{
          margin-left:r2(14)
        }
        .right{
          margin-right:r2(14)
        }


        .triangle {
          margin-left: r2(10);
          margin-top: r2(9);
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
          margin-top: r2(9);
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
        width: r2(1049);
        margin: 0 auto;
        margin-top: r2(42);

        .tab {
          width: r2(336);
          height: r2(50);
          background-image: linear-gradient(1deg, #3182fb 0%, #8ebbfb 0%, #ebf3fa 0%, #67d7fc 100%), linear-gradient(#ffffff, #ffffff);
          box-shadow: r2(1) r2(2) r2(6) 0px rgba(1, 34, 62, 0.42);
          border-radius: r2(8);
          font-size: r2(24);
          line-height: r2(50);
          color: #0454a9;
          text-align: center;
        }

        .active {
          background-image: linear-gradient(-8deg, #f4d736 0%, #fced00 51%, #a0eee6 100%), linear-gradient(#fefefe, #fefefe);
          box-shadow: r2(1) r2(2) r2(6) 0px rgba(0, 32, 59, 0.42);
        }
      }

      .table {
        width: r2(1049);
        min-height: r2(820);
        margin: 0 auto;
        margin-top: r2(20);

        .theader {
          display: flex;

          div {
            text-align: center;
            font-size: r2(22);
            color: #ffffff;
            height: r2(60);
            line-height: r2(60);
          }

          .hone {
            width: r2(287);
          }

          .htwo {
            width: r2(303);
          }

          .hthree {
            width: r2(249);
          }

          .hfour {
            width: r2(227);
          }
        }

        .tbody {
          // margin
          .bodyrow {
            display: flex;
            margin-bottom: r2(10);

            &>div {
              text-align: center;
              font-size: r2(18);
              color: #ffffff;
              height: r2(60);
              line-height: r2(60);
              background-color: rgba(255, 255, 255, 0.3);
              margin-right: r2(1);
            }

            .tone {
              width: r2(287);
              display: flex;

              img {
                width: auto;
                height: r2(60);
                display: block;
              }

              .text {
                color: #fff;
              }
            }

            .ttwo {
              width: r2(303);
              position: relative;

              .el-progress {
                margin: 0 auto;
                width: r2(281);
                margin-top: r2(10);
              }

              /deep/ .el-progress-bar__outer {
                background-color: #f1fbfe;
                height: r2(40) !important;
              }

              /deep/ .el-progress-bar__innerText {
                display: none;
                color: #0454a9;
                font-size: r2(18);
              }

              .newnum {
                width: r2(303);
                text-align: center;
                top: 0;
                left: 0;
                color: #0454a9;
                font-size: r2(18);
                position: absolute;
              }
            }

            .tthree {
              width: r2(249);
            }

            .tfour {
              width: r2(227);

              .status1 {
                margin: 0 auto;
                margin-top: r2(10);
                width: r2(131);
                height: r2(40);
                line-height: r2(40);
                background-image: linear-gradient(-8deg, #f4d736 0%, #fced00 51%, #a0eee6 100%), linear-gradient(#f1fbfe, #f1fbfe);
                box-shadow: r2(1) r2(2) r2(6) 0px rgba(0, 32, 59, 0.42);
                border-radius: r2(20);
                color: #0454a9;
                font-size: r2(18);
                text-align: center;
              }
            }
          }
        }
      }

      .getbox {
        display: flex;
        justify-content: space-between;
        width: r2(1005);
        margin: 0 auto;
        margin-top: r2(46);

        .mountbox {
          .able {
            display: flex;
            margin-bottom: r2(24);

            .avai {
              width: r2(400);
              height: r2(61);
              line-height: r2(61);
              background-image: linear-gradient(1deg, #3182fb 0%, #8ebbfb 0%, #ebf3fa 0%, #67d7fc 100%), linear-gradient(#3e8ae1, #3e8ae1);
              box-shadow: r2(1) r2(2) r2(6) 0px rgba(1, 34, 62, 0.42);
              border-radius: r2(8);
              color: #0454a9;
              font-size: r2(24);
              padding-left: r2(20);
            }

            .get {
              width: r2(190);
              height: r2(61);
              line-height: r2(0);
              background-image: linear-gradient(-8deg, #f4d736 0%, #fced00 51%, #a0eee6 100%), linear-gradient(#faeb03, #faeb03);
              box-shadow: r2(1) r2(2) r2(6) 0px rgba(0, 32, 59, 0.42);
              border-radius: r2(8);
              border: solid r2(4) rgba(255, 255, 255, 0.25);
              text-align: center;
              color: #0454a9;
              font-size: r2(24);
              margin-left: r2(54);
            }

            .is-disabled {
              background: #f4d736 !important;
              opacity: 0.6 !important;
            }

            .draw {
              width: r2(190);
              height: r2(61);
              border-radius: r2(8);
              line-height: r2(0);
              // background:#f1fbfe
              text-align: center;
              color: #0454a9;
              font-size: r2(24);
              margin-left: r2(54);
              background-image: linear-gradient(-8deg, #f4d736 0%, #fced00 51%, #a0eee6 100%), linear-gradient(#faeb03, #faeb03);
              box-shadow: r2(1) r2(2) r2(6) 0px rgba(0, 32, 59, 0.42);
            }
          }
        }

        .record {
          width: r2(190);
          height: r2(61);
          line-height: r2(0);
          background-color: rgba(62, 138, 225, 0.9);
          border-radius: r2(8);
          border: solid r2(1) #a0cef5;
          font-size: r2(24);
          color: #fff;
          text-align: center;
          margin-top: r2(43);
        }
      }
    }

    .themetwo {
      width: r2(1279);
      height: r2(701);
      background-image: url('../../common/image/botbg.png');
      background-size: 100%;
      background-repeat: no-repeat;
      // margin-top: r2(10);

      .twotitle {
        width: r2(1000);
        font-size: r2(24);
        line-height: r2(35);
        color: #ebfa03;
        margin: 0 auto;
        padding-left: r2(60);
        padding-top: r2(66);
      }

      .table {
        margin-top: r2(62);
        margin-left: r2(115);

        .theader {
          display: flex;

          div {
            text-align: center;
            font-size: r2(22);
            color: #ffffff;
            height: r2(60);
            line-height: r2(60);
          }

          .hone {
            width: r2(287);
            margin-right: r2(48);
          }

          .htwo {
            width: r2(287);
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
              height: r2(60);
              line-height: r2(60);
              background-color: rgba(255, 255, 255, 0.3);
              margin-right: r2(1);
            }

            .tone {
              width: r2(287);
              margin-right: r2(48);
            }

            .ttwo {
              width: r2(287);
            }
          }
        }
      }

      .mountbox {
        width: r2(664);
        margin-left: r2(117);
        margin-top: r2(38);

        .able {
          display: flex;
          margin-bottom: r2(24);

          .avai {
            width: r2(400);
            height: r2(61);
            line-height: r2(61);
            background-image: linear-gradient(1deg, #3182fb 0%, #8ebbfb 0%, #ebf3fa 0%, #67d7fc 100%), linear-gradient(#3e8ae1, #3e8ae1);
            box-shadow: r2(1) r2(2) r2(6) 0px rgba(1, 34, 62, 0.42);
            border-radius: r2(8);
            color: #0454a9;
            font-size: r2(24);
            padding-left: r2(20);
          }

          .get {
            width: r2(190);
            height: r2(61);
            line-height: r2(0);
            background-image: linear-gradient(-8deg, #f4d736 0%, #fced00 51%, #a0eee6 100%), linear-gradient(#faeb03, #faeb03);
            box-shadow: r2(1) r2(2) r2(6) 0px rgba(0, 32, 59, 0.42);
            border-radius: r2(8);
            border: solid r2(4) rgba(255, 255, 255, 0.25);
            text-align: center;
            color: #0454a9;
            font-size: r2(24);
            margin-left: r2(54);
          }

          .is-disabled {
            background: #f4d736 !important;
            opacity: 0.6 !important;
          }

          .draw {
            width: r2(190);
            height: r2(61);
            border-radius: r2(8);
            line-height: r2(0);
            background: rgba(62, 138, 225, 0.9);
            text-align: center;
            color: #fff;
            font-size: r2(24);
            margin-left: r2(54);
            border: solid r2(1) #a0cef5;
          }
        }
      }
    }

    .rulebox {
      width: r2(1200);
      margin: 0 auto;
      // margin-top: r2(25);

      img {
        width: r2(566);
        height: r2(130);
        margin: 0 auto;
        text-align: center;
        display: block;
      }

      .ruletext {
        font-size: r2(30);
        color: #ffffff;
        font-weight: bold;
        width: r2(566);
        margin: 0 auto;
        text-align: center;
        margin-top: r2(-60);
      }

      .content {
        margin-top: r2(15);
        width: r2(1200);
        background-color: rgba(17, 125, 215, 0.6);
        border-radius: r2(20);
        padding: r2(27) r2(31);

        p {
          font-size: r2(20);
          color: #fff;
          // font-weight: bold;
          margin-bottom: r2(18);
          text-align:center
        }

        span {
          font-size: r2(20);
          color: #fff;
          line-height: r2(32);
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
      width: r2(1200);
      margin: 0 auto;
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
        top: r2(210);
        left: r2(140);
      }

      .modelcontent {
        position: absolute;
        font-size: r2(18);
        line-height: r2(30);
        color: #ffffff;
        width: r2(452);
        text-align: center;
        top: r2(289);
        left: r2(51);
      }

      .dele {
        position: absolute;
        top: r2(178);
        right: r2(18);
        width: r2(45);
        height: r2(45);
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
}

.post {
  width: r2(378);
  height: r2(220);
  background: rgba(225, 225, 225, 0.33);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: r2(10);
  margin: auto;

  .cbg {
    width: r2(357);
    height: r2(199);
    background-image: linear-gradient(-8deg, #0a6fd7 0%, #1e79e9 0%, #3182fb 0%, #05bbf7 100%), linear-gradient(#ffffff, #ffffff);
    border-radius: r2(10);
  }

  .modeltitle {
    font-size: r2(24);
    line-height: r2(15);
    color: #ebfa03;
    box-shadow: r2(1) r2(2) r2(10) 0px rgba(0, 150, 234, 0.75);
    width: r2(348);
    text-align: center;
    margin-top: r2(30);
  }

  .modelcontent {
    font-size: r2(18);
    line-height: r2(30);
    color: #ffffff;
    width: r2(348);
    text-align: center;
    margin-top: r2(10);
  }

  .btns {
    padding: 0 r2(30);
    margin-top: r2(20);
    display: flex;
    justify-content: space-between;

    div {
      width: r2(120);
      height: r2(45);
      line-height: r2(45);
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

.login_box {
  position: absolute;
  width: 100%;
  height: r2(650);
  top:20%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 22;

  .post {
    width: r2(955);
    height: r2(582);
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
      height: auto;
      top: r2(-105);
      left: r2(194.5);
    }

    .title {
      position: absolute;
      font-size: r2(30);
      color: #ebfa03;
      width: r2(955);
      text-align: center;
      top: r2(-40);
      letter-spacing: r2(5);
    }

    .container {
      background-color: rgba(255, 255, 255, 0.33);
      border-radius: r2(10);
      width: r2(955);
      min-height: r2(582);
      display: flex;
      justify-content: center;
      align-items: center;

      .consbox {
        width: r2(930);
        min-height: r2(555);
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
              margin-right: r2(1);
            }

            .one {
              width: r2(106);
            }

            .two {
              width: r2(226);
            }

            .three {
              width: r2(196);
            }

            .four {
              width: r2(197);
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
              margin-right: r2(1);
            }

            .one {
              width: r2(106);
            }

            .two {
              width: r2(226);
            }

            .three {
              width: r2(196);
            }

            .four {
              width: r2(197);
            }

            .five {
              width: r2(160);
            }
          }
        }
        .nothing{
          font-size:r2(20)
          margin-top:r2(20)
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
.success{
  display:flex;
  background:#f0f9eb;
  padding:r2(30)
  font-size:r2(34)
  position:fixed;
  width:40%;
  left:30%;
  color:#67c23a
  border-radius:r2(8)
  border: r2(1) solid #67c23a
  .el-icon-circle-check{
    font-size:r2(40)
  }
  div{
    margin-left:r2(30)
  }
}
.warning{
  display:flex;
  background:#fdf6ec;
  padding:r2(30)
  font-size:r2(34)
  position:absolute;
  width:40%;
  left:30%;
  color:#e6a23c
  border-radius:r2(8)
  border: r2(1) solid #e6a23c
  .el-icon-circle-check{
    font-size:r2(40)
  }
  div{
    margin-left:r2(30)
  }
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
