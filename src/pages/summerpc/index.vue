<template>
  <div class="pc_container">
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
          主题一:
          活动期间会员自然周内于真人、棋牌或电子任意单一平台投注，累计有效投注达以下
          要求，即可获得对应彩金奖励，完成平台数越多奖励越多。
        </div>
        <div class="datecheck"></div>
        <div class="tabs">
          <div
            :class="action == item.index ? 'tab active' : 'tab'"
            v-for="item in checkList"
            @click="changetab(item.index)"
          >
            {{ item.name }}
          </div>
        </div>

        <div class="table">
          <div class="theader">
            <div class="hone">指定平台任务</div>
            <div class="htwo">累积有效投注</div>
            <div class="hthree">奖励</div>
            <div class="hfour">任务进度</div>
          </div>
          <div class="tbody">
            <div class="bodyrow" v-for="(item, i) in platList" :key="item.name">
              <div class="tone">
                <img :src="item.url" />
                <div class="text">{{ item.name }}</div>
              </div>
              <div class="ttwo">
                <Progress
                  :text-inside="true"
                  color="#a9e9fb"
                  :stroke-width="20"
                  :percentage="item.percent"
                ></Progress>
              </div>
              <div class="tthree">{{ item.amount }}</div>
              <div class="tfour">
                <div class="status1">立即投注</div>
                <!-- <div>已完成</div>
                <div>已过期</div> -->
              </div>
            </div>
          </div>
        </div>

        <div class="getbox">
          <div class="mountbox">
            <div class="able">
              <div class="avai">上周可领取彩金：xx元</div>
              <div class="get">领取彩金</div>
            </div>
            <div class="able">
              <div class="avai">本周可领取彩金：xx元</div>
              <div class="draw">领取彩金</div>
            </div>
          </div>
          <div class="record">领取记录</div>
        </div>
      </div>

      <div class="themetwo">
        <div class="twotitle">
          主题二：参与主题一的会员，自然周内完成指定任务平台数≥5个还可获得额外活跃嘉奖。
          小贴士：自然周为周一00:00:00至周日23:59:59。（领取期限：当周周二
          23:59:59 前）
        </div>
        <div class="table">
          <div class="theader">
            <div class="hone">自然周完成指定任务平台数</div>
            <div class="htwo">额外活跃嘉奖</div>
          </div>
          <div class="tbody">
            <div class="bodyrow" v-for="(item, i) in taskList" :key="item.name">
              <div class="tone">{{ item.num }}个</div>
              <div class="ttwo">{{ item.amount }}元</div>
            </div>
          </div>
        </div>
        <div class="mountbox">
          <div class="able">
            <div class="avai">上周可领取彩金：xx元</div>
            <div class="get">领取彩金</div>
          </div>
          <div class="able">
            <div class="avai">本周可领取彩金：xx元</div>
            <div class="draw">领取彩金</div>
          </div>
        </div>
      </div>

      <div class="rulebox">
        <img src="../../common/image/rule.png" />
        <div class="content">
          <p>
            【申请方式】获得彩金奖励的会员，点击领取后系统将自动派发至您的游戏账户，届时请您查收。
          </p>
          <p>【温馨提示】</p>
          <span>
            1.本优惠主题一系统将在游戏结算后进行审核派发，每个自然周各指定任务平台皆可获得一次奖励；主题二将在次周一根据上一周内达成最高条件派发一次。<br />
            2.本优惠所获的彩金奖励需会员手动点击进行领取，如在限定时间内（当周周二23:59:59前）未领取将视为放弃，无法补发。<br />
            3.本优惠所获彩金仅需在真人、棋牌或电子平台（不含捕鱼）完成五倍流水方可提款。<br />
            4.本优惠所需投注不与其他投注活动共享，可与返水活动共享。<br />
            5.本优惠仅对已结算并产生输赢结果的投注流水进行计算。所有拒绝投注，无效投注，打平，任何出现对押情况的投注（例：于百家乐同时下注庄家及闲家，百家乐当中开和退还本金）将不予计算。<br />
          </span>
          <div class="mr">
            本优惠遵循ManBetX万博<span>【一般优惠规则与条款】</span>。
          </div>
        </div>
      </div>
      <div class="btns">
        <div @click="backTop">返回顶部</div>
      </div>
    </div>

    <div v-show="dialogVisible" class="model-box">
      <div class="modelveng" @click="dialogVisible = false"></div>
      <div class="modeltable">
        <div class="chief">{{ $t("grandbet") }}</div>
        <div class="table">
          <div class="header three">
            <div>{{ $t("index") }}</div>
            <div>{{ $t("order") }}</div>
            <div>{{ $t("color") }}</div>
            <div class="time">{{ $t("gettime") }}</div>
          </div>
          <div class="body three" v-for="(item, i) in listdata">
            <div>{{ i + 1 }}</div>
            <div>{{ item.order_no }}</div>
            <div>{{ parseFloat(item.lottery_amount).toFixed(3) }}</div>
            <div class="time">{{ item.created_at }}</div>
          </div>
        </div>
        <img class="dele" @click="dialogVisible = false" src="" />
      </div>
    </div>

    <div v-show="darwdialog" class="model-box">
      <div class="modelveng" @click="darwdialog = false"></div>
      <div class="back_box">
        <div class="post">
          <!-- <img class="back" src="../../common/img/tips2.png" /> -->
          <div class="num">{{ parseFloat(money).toFixed(3) }} VNDK</div>
          <div class="cons">{{ $t("congra") }}</div>
          <div class="dele">
            <!-- <img @click="darwdialog = false" src="../../common/img/del.png" /> -->
          </div>
        </div>
      </div>
    </div>

    <div v-show="showlogin" class="model-box">
      <div class="modelveng" @click="showlogin = false"></div>
      <div class="login_box">
        <div class="post">
          <!-- <img class="back" src="../../common/img/top.png" /> -->
          <div class="num">{{ $t("respect") }}</div>
          <div class="cons">{{ $t("login") }}</div>
          <div class="dele">
            <!-- <img @click="showlogin = false" src="../../common/img/del.png" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Progress, Dialog, Table, Loading } from "element-ui";
Vue.use(Progress)
  .use(Dialog)
  .use(Table)
  .use(Loading);
import { _debounce } from "@/utils";
import { mapGetters } from "vuex";

import { getReceiveList, cumulativeTheme, getMoneyAdd, getunlock } from "@/api";
export default {
  components: {
    Progress: Progress,
  },
  data() {
    return {
      checkList: [
        { name: "真人平台", index: 1 },
        { name: "棋牌平台", index: 2 },
        { name: "电子平台", index: 3 },
      ],
      action: 1,
      platList: [
        {
          url: require("../../common/image/peopleicon/bbin真人.png"),
          name: "BBIN娱乐",
          percent: 23,
          amount: "38元",
          status: 1,
        },
        {
          url: require("../../common/image/peopleicon/万博娱乐.png"),
          name: "万博娱乐",
          percent: 23,
          amount: "38元",
          status: 1,
        },
        {
          url: require("../../common/image/peopleicon/ae真人.png"),
          name: "AE性感百家",
          percent: 23,
          amount: "38元",
          status: 1,
        },
        {
          url: require("../../common/image/peopleicon/ag娱乐.png"),
          name: "AG娱乐",
          percent: 23,
          amount: "38元",
          status: 1,
        },
        {
          url: require("../../common/image/peopleicon/完美视讯.png"),
          name: "完美视讯",
          percent: 23,
          amount: "38元",
          status: 1,
        },
        {
          url: require("../../common/image/peopleicon/欧博娱乐.png"),
          name: "鸥博娱乐",
          percent: 23,
          amount: "38元",
          status: 1,
        },
        {
          url: require("../../common/image/peopleicon/ogplus.png"),
          name: "OG Plus",
          percent: 23,
          amount: "38元",
          status: 1,
        },
        {
          url: require("../../common/image/peopleicon/evo真人.png"),
          name: "EVO真人",
          percent: 23,
          amount: "38元",
          status: 1,
        },
        {
          url: require("../../common/image/peopleicon/万博实地厅.png"),
          name: "万博实地厅",
          percent: 23,
          amount: "38元",
          status: 1,
        },
        {
          url: require("../../common/image/peopleicon/cq9真人.png"),
          name: "CQ9真人",
          percent: 23,
          amount: "38元",
          status: 1,
        },
        {
          url: require("../../common/image/peopleicon/bg娱乐.png"),
          name: "BG娱乐",
          percent: 23,
          amount: "38元",
          status: 1,
        },
      ],
      taskList: [
        { num: "≥5", amount: "20" },
        { num: "≥9", amount: "50" },
        { num: "≥15", amount: "100" },
      ],

      dialogVisible: false,
      darwdialog: false,
      showlogin: false,
      loading: "",
    };
  },
  computed: {
    ...mapGetters(["username"]),
  },

  async mounted() {
    // 加载时显示loading
    // this.loading = this.$loading({
    //   lock: true,
    //   text: "Loading",
    //   spinner: "el-icon-loading",
    //   background: "rgba(0, 0, 0, 0.7)",
    // });
    const isbro = this.judgeBrowser();
    console.log(isbro);
    if (isbro == "h5") {
      this.$router.replace(`/summer_h5`);
    }
    this.getheme();
  },
  methods: {
    // 获取页面信息
    async getheme(user_id) {
      let list = [
        // { img: require("../../common/imgs/1@2x.png") },
        // { img: require("../../common/imgs/2@2x.png") },
        // { img: require("../../common/imgs/3@2x.png") },
        // { img: require("../../common/imgs/4@2x.png") },
        // { img: require("../../common/imgs/5@2x.png") },
        // { img: require("../../common/imgs/6@2x.png") },
        // { img: require("../../common/imgs/7@2x.png") },
        // { img: require("../../common/imgs/8@2x.png") },
      ];
      await cumulativeTheme().then((res) => {
        console.log(res);
        if (res.code == 200) {
          // this.loading.close();
          let data = res.data;
          this.activityContent = data;
          let reslist = [
            {
              label: this.$t("granddep"),
              num: data.jl_today_number,
              percent: data.wire_valid_bet_amount,
              // percent: 2987.0,
              total: 1500,
            },
            {
              label: this.$t("getmeet"),
              num: data.ai_today_number,
              percent: data.sport_valid_bet_amount,
              // percent: 2345.1,
              total: 2800,
            },
            {
              label: this.$t("opendrew"),
              num: data.ae_today_number,
              percent: data.really_valid_bet_amount,
              // percent: 2864.98,
              total: 3500,
            },
          ];
          this.cersivelist = reslist;
          this.$set(this.cersivelist, 0, reslist[0]);
          this.$set(this.cersivelist, 1, reslist[1]);
          this.$set(this.cersivelist, 2, reslist[2]);

          let delock_count = data.delock_count; //已解锁
          let unlock_count = data.unlock_count; //可解锁
          let notlock_count = data.notlock_count; //未解锁
          // let delock_count = 1; //已解锁
          // let unlock_count = 4; //可解锁
          // let notlock_count = 3; //未解锁

          list.forEach((item, i) => {
            let idx = i + 1;
            item.type = 3;
            if (idx <= delock_count) {
              item.type = 1;
            }
            if (idx > delock_count && idx <= unlock_count + delock_count) {
              item.type = 2;
            }
          });
          this.imglist = list;
          this.$set(this.imglist, 0, list[0]);
        } else {
          this.loading.close();
          // this.showlogin = true;
        }
      });
    },
    // 切换tab
    changetab(index) {
      this.action = index;
    },
    // 返回顶部
    backTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    // 解锁
    async deblock() {
      if (!this.user_id) {
        // this.showlogin = true;
        return;
      }
      await getunlock({ user_id: this.user_id }).then((res) => {
        if (res.code == 200) {
          this.getheme(this.user_id);
          this.$message({ type: "success", message: this.$t("unlocks") });
        } else {
          this.$message({ type: "warning", message: res.msg });
        }
      });
    },
    // 领取彩金
    getcollet: _debounce(function(type) {
      this.checkcollet(type);
    }, 500),

    async checkcollet(type) {
      if (!this.user_id) {
        // this.showlogin = true;
        return;
      }
      let {
        lottery_money,
        total_number,
        plus_lottery_money,
      } = this.activityContent;
      let money = type == 1 ? lottery_money : plus_lottery_money;
      if (!Number(money)) {
        this.$message({ type: "warning", message: this.$t("noerr") });
        return;
      }
      let params = {
        user_id: this.user_id,
        lottery_amount: type == 1 ? lottery_money : plus_lottery_money,
        lottery_type: type == 1 ? "theme_one" : "theme_two",
        finish_count: total_number,
      };
      await getMoneyAdd(params).then((res) => {
        if (res.code == 200) {
          // this.darwdialog = true;
          this.money = money;
          this.getheme(this.user_id);
        } else {
          this.$message({ type: "warning", message: res.msg });
        }
      });
    },
    // 关闭弹窗
    cancelmodel() {
      this.dialogVisible = false;
    },

    // 打开领奖记录
    getRecive() {
      if (!this.user_id) {
        // this.showlogin = true;
        return;
      }
      this.getinfo(this.user_id);
    },
    // 领取记录
    async getinfo(uid) {
      await getReceiveList({
        user_id: uid,
        page_size: 9999,
      }).then((res) => {
        this.listdata = res.data.list;
        // this.dialogVisible = true;
      });
    },

    judgeBrowser() {
      let isenv = "";
      // 先判断是不是微信端打开的
      if (/(micromessenger)/i.test(navigator.userAgent)) {
        // alert("微信");
        isenv = "wechat";
      } else {
        // alert("普通浏览器");
        // 判断h5还是pc true就是h5
        let client = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
        if (client) {
          isenv = "h5";
        } else {
          isenv = "pc";
        }
      }
      return isenv;
    },

    format_with_substring(number) {
      // 数字转为字符串，并按照 .分割
      let arr = (number + "").split(".");
      let int = arr[0] + "";
      let fraction = arr[1] || "";
      // 多余的位数
      let f = int.length % 3;
      // 获取多余的位数，f可能是0， 即r可能是空字符串
      let r = int.substring(0, f);
      // 每三位添加','金额对应的字符
      for (let i = 0; i < Math.floor(int.length / 3); i++) {
        r += "," + int.substring(f + i * 3, f + (i + 1) * 3);
      }
      // 多余的位数，上面
      if (f === 0) {
        r = r.substring(1);
      }
      // 调整部分和小数部分拼接
      return r + (!!fraction ? "." + fraction : "");
    },
  },
};
</script>

<style lang="stylus" scoped>
r(designpx )
  $rem = 37.5px;
  return (designpx / $rem )rem

r2(val){
  return (val/16)rem
}

.pc_container{
  width:100vw;
  height:r2(4040);
  font-family:Arial;
  background-image:url('../../common/image/bj.jpg');
  background-size:100%;
  background-repeat:no-repeat;
  .logo{
    width:r2(281);
    height:r2(64)
    margin-left:r2(363)
    margin-top:r2(20)
  }
  .allbox{
    width:r2(1279);
    margin:0 auto;
    margin-top:r2(660);
    .rowbox{
      padding:0 r2(50)
      display:flex;
      justify-content:space-between;
      .actinfo{
        width:r2(343);
        height:r2(127);
        background-image:url('../../common/image/timebg.png');
        background-size:100%;
        background-repeat:no-repeat;
        text-align:center;
        .time{
          font-size: r2(24);
          font-weight: 600;
          font-stretch: normal;
          color: #ffffff;
          margin-top:r2(31)
          margin-bottom:r2(15)
        }
        .date{
          font-size: r2(18);
          font-weight: 400;
          font-stretch: normal;
          color: #ffffff;
        }
      }
    }
    .titlebox{
      width:r2(1201);
      height:r2(184)
      margin:0 auto
      margin-top:r2(38)
      img{
        width:100%;
        height:100%;
      }
    }
    .themeone{
      width:r2(1279);
      height:r2(1453)
      background-image:url('../../common/image/centerbg.png');
      background-size:100%;
      background-repeat:no-repeat;
      margin-top:r2(43)
      .onetitle{
        width:r2(935)
        font-size: r2(24);
        line-height: r2(35);
        color: #ebfa03;
        margin:0 auto;
        padding-left:r2(40)
        padding-top:r2(66)
      }
      .datecheck{
        width:r2(453)
        height:r2(44)
        background:red
        margin:0 auto
        margin-top:r2(80)
      }
      .tabs{
        display:flex;
        justify-content:space-between;
        width:r2(1049)
        margin:0 auto
        margin-top:r2(42)
        .tab{
          width: r2(336);
          height: r2(50);
          background-image: linear-gradient(1deg, #3182fb 0%,#8ebbfb 0%,#ebf3fa 0%,#67d7fc 100%), linear-gradient(#ffffff, #ffffff);
	        box-shadow: r2(1) r2(2) r2(6) 0px	rgba(1, 34, 62, 0.42);
          border-radius: r2(8);
          font-size: r2(24);
          line-height: r2(50);
          color: #0454a9;
          text-align:center
        }
        .active{
          background-image: linear-gradient(-8deg, #f4d736 0%, #fced00 51%, #a0eee6 100%),linear-gradient(#fefefe,	#fefefe);
          box-shadow: r2(1) r2(2) r2(6) 0px rgba(0, 32, 59, 0.42);
        }

      }
      .table{
        width:r2(1049)
        margin:0 auto
        margin-top:r2(20)
        .theader{
          display:flex
          div{
            text-align:center
            font-size:r2(22)
            color: #ffffff;
            height:r2(60);
            line-height:r2(60)
          }
          .hone{
            width:r2(287)
          }
          .htwo{
            width:r2(303)
          }
          .hthree{
            width:r2(249)
          }
          .hfour{
            width:r2(227)
          }
        }
        .tbody{
          // margin
          .bodyrow{
            display:flex;
            margin-bottom:r2(10)
            &>div{
              text-align:center
              font-size:r2(18)
              color: #ffffff;
              height:r2(60);
              line-height:r2(60)
              background-color: rgba(255,255,255,0.3);
              margin-right:r2(1)
            }
            .tone{
              width:r2(287);
              display:flex;
              img{
                width:auto
                height:r2(60)
                display:block
              }
              .text{
                color:#fff
              }
            }
            .ttwo{
              width:r2(303)
              .el-progress{
                margin:0 auto
                width:r2(281)
                margin-top:r2(10)
              }
              /deep/ .el-progress-bar__outer{
                background-color:#f1fbfe
                height:r2(40) !important
              }
              /deep/ .el-progress-bar__innerText{
                color:#0454a9
                font-size:r2(18)
              }
            }
            .tthree{
              width:r2(249)
            }
            .tfour{
              width:r2(227)
              .status1{
                margin: 0 auto
                margin-top:r2(10)
                width: r2(131);
                height: r2(40);
                line-height: r2(40);
                background-image: linear-gradient(-8deg, #f4d736 0%, #fced00 51%, #a0eee6 100%), linear-gradient(#f1fbfe, #f1fbfe);
                box-shadow: r2(1) r2(2) r2(6) 0px rgba(0, 32, 59, 0.42);
                border-radius: r2(20);
                color: #0454a9;
                font-size:r2(18)
                text-align:center
              }
            }
          }
        }
      }

      .getbox{
        display:flex;
        justify-content:space-between
        width:r2(1005)
        margin:0 auto;
        margin-top:r2(46)
        .mountbox{

          .able{
            display:flex;
            margin-bottom:r2(24)
            .avai{
              width: r2(400);
              height: r2(61);
              line-height: r2(61);
              background-image: linear-gradient(1deg,#3182fb 0%,#8ebbfb 0%,#ebf3fa 0%,#67d7fc 100%), linear-gradient(#3e8ae1, #3e8ae1);
              box-shadow: r2(1) r2(2) r2(6) 0px rgba(1, 34, 62, 0.42);
              border-radius: r2(8);
              color: #0454a9;
              font-size:r2(24)
              padding-left:r2(20)
            }
            .get{
              width: r2(190);
              height: r2(61);
              line-height: r2(61);
              background-image: linear-gradient(-8deg,#f4d736 0%,#fced00 51%,#a0eee6 100%), linear-gradient(#faeb03, #faeb03);
              box-shadow: r2(1) r2(2) r2(6) 0px rgba(0, 32, 59, 0.42);
              border-radius: r2(8);
              border: solid r2(4) rgba(255, 255, 255, 0.25);
              text-align:center
              color: #0454a9;
              font-size:r2(24)
              margin-left:r2(54)
            }
            .draw{
               width: r2(190);
              height: r2(61);
              border-radius: r2(8);
              line-height: r2(61);
              background:#f1fbfe
              text-align:center
              color: #0454a9;
              font-size:r2(24)
              margin-left:r2(54)
            }
          }
        }
        .record{
          width: r2(190);
          height: r2(61);
          line-height: r2(61);
          background-color: rgba(62,138,225,0.9);
          border-radius: r2(8);
          border: solid r2(1) #a0cef5;
          font-size:r2(24)
          color:#fff;
          text-align:center
          margin-top:r2(43)
        }
      }
    }

    .themetwo{
      width:r2(1279);
      height:r2(701)
      background-image:url('../../common/image/botbg.png');
      background-size:100%;
      background-repeat:no-repeat;
      margin-top:r2(10)
      .twotitle{
        width:r2(1000)
        font-size: r2(24);
        line-height: r2(35);
        color: #ebfa03;
        margin:0 auto;
        padding-left:r2(60)
        padding-top:r2(66)
      }

      .table{
        margin-top:r2(62)
        margin-left:r2(115)
        .theader{
          display:flex
          div{
            text-align:center
            font-size:r2(22)
            color: #ffffff;
            height:r2(60);
            line-height:r2(60)
          }
          .hone{
            width:r2(287)
            margin-right:r2(48)
          }
          .htwo{
            width:r2(287)
          }
        }
        .tbody{
          .bodyrow{
            display:flex;
            margin-bottom:r2(10)
            &>div{
              text-align:center
              font-size:r2(20)
              color: #ffffff;
              height:r2(60);
              line-height:r2(60)
              background-color: rgba(255,255,255,0.3);
              margin-right:r2(1)
            }
            .tone{
              width:r2(287);
              margin-right:r2(48)
            }
            .ttwo{
              width:r2(287)
            }
          }
        }
      }
      .mountbox{
        width:r2(664)
        margin-left:r2(117)
        margin-top:r2(38)
        .able{
          display:flex;
          margin-bottom:r2(24)
          .avai{
            width: r2(400);
            height: r2(61);
            line-height: r2(61);
            background-image: linear-gradient(1deg,#3182fb 0%,#8ebbfb 0%,#ebf3fa 0%,#67d7fc 100%), linear-gradient(#3e8ae1, #3e8ae1);
            box-shadow: r2(1) r2(2) r2(6) 0px rgba(1, 34, 62, 0.42);
            border-radius: r2(8);
            color: #0454a9;
            font-size:r2(24)
            padding-left:r2(20)
          }
          .get{
            width: r2(190);
            height: r2(61);
            line-height: r2(61);
            background-image: linear-gradient(-8deg,#f4d736 0%,#fced00 51%,#a0eee6 100%), linear-gradient(#faeb03, #faeb03);
            box-shadow: r2(1) r2(2) r2(6) 0px rgba(0, 32, 59, 0.42);
            border-radius: r2(8);
            border: solid r2(4) rgba(255, 255, 255, 0.25);
            text-align:center
            color: #0454a9;
            font-size:r2(24)
            margin-left:r2(54)
          }
          .draw{
              width: r2(190);
            height: r2(61);
            border-radius: r2(8);
            line-height: r2(61);
            background:#f1fbfe
            text-align:center
            color: #0454a9;
            font-size:r2(24)
            margin-left:r2(54)
          }
        }
      }
    }

    .rulebox{
      width:r2(1200)
      margin:0 auto
      margin-top:r2(25)
      img{
        width:r2(566)
        height:r2(130)
        margin:0 auto
        text-align center
        display: block
      }
      .content{
        margin-top:r2(-22)
        width:r2(1200)
        background-color: rgba(17,125,215,0.6);
        border-radius: r2(20);
        padding:r2(27) r2(31)
        p{
          font-size: r2(18);
          color:#fff
          font-weight:bold
          margin-bottom:r2(18)
        }
        span{
          font-size:r2(20)
          color:#fff
          line-height:r2(32)
        }
        .mr{
          margin-top:r2(18)
          color:#fff
          font-size:r2(20)
          span{
            color:#faec04;
          }
        }
      }
    }
    .btns{
      width:r2(1200)
      display:flex;
      justify-content:center
      margin-top:r2(50)
      div{
        width: r2(280);
        height: r2(66);
        line-height: r2(66);
        text-align center
        background-image: linear-gradient(1deg, #3182fb 0%, #8ebbfb 0%,#ebf3fa 0%,#67d7fc 100%), linear-gradient(0deg, #2c85f5 0%, #0cb3f8 100%);
        box-shadow: r2(1) r2(2) r2(6) 0px rgba(1, 34, 62, 0.42);
        border-radius: r2(10);
        color: #0454a9;
        font-size:r2(24)
      }
    }
  }

}
</style>
