<template>
  <div class="h5_container">
    <img class="banner" src="../../common/imgs/banner@2x.png" />
    <div class="top_box">
      <div class="top_content">
        <div class="row_one time">
          <div>【{{ $t("opennum") }}】</div>
          <p>01/01/2023-06/01/2023</p>
        </div>
        <div class="row_one">
          <div>【{{ $t("singledep") }}】</div>
          <p>{{ $t("getaward") }}</p>
        </div>
        <div class="row_one">
          <div>【{{ $t("gainchance") }}】</div>
          <p>{{ $t("platform") }}</p>
        </div>
      </div>
    </div>

    <div class="receive">
      <img class="pos1" src="../../common/img/2-2@2x.png" />
      <img class="pos2" src="../../common/imgs/yun.png" />
      <img class="pos3" src="../../common/imgs/yun.png" />
      <div class="rece_box">
        <div class="title">
          <img src="../../common/img/2-4@2x.png" />
          <div @click="getRecive">{{ $t("grandbet") }}</div>
        </div>
        <div class="row" v-for="item in cersivelist">
          <div class="left">
            <div>
              {{ item.label }}:
              <span class="mar"
                >{{ $t("todaycomp") }}：{{ item.num }} {{ $t("degree") }}</span
              >
            </div>
          </div>
          <div class="right">
            <Progress
              :show-text="false"
              :color="color"
              :text-inside="true"
              :stroke-width="10"
              :percentage="
                Number(item.percent / item.total) * 100 > 100
                  ? 100
                  : Number(item.percent / item.total) * 100
              "
            ></Progress>
            <div class="perc">
              {{ format_with_substring(parseFloat(item.percent).toFixed(3)) }}
              VNDK
            </div>
            <div class="total">
              {{ format_with_substring(item.total) }} VNDK
            </div>
          </div>
        </div>

        <div class="grand">
          <div class="all">
            <div class="num">
              {{ $t("incentive") }}：<span
                >{{ activityContent.total_number }} {{ $t("degree") }}</span
              >
            </div>
            <div class="mon">
              {{ $t("handsel") }}：<span
                >{{
                  format_with_substring(
                    parseFloat(activityContent.lottery_money).toFixed(3)
                  )
                }}
                VNDK</span
              >
            </div>
          </div>
          <div class="btn" @click="getcollet(1)">
            <img src="../../common/img/4@2x.png" />
            <div>{{ $t("pulldown") }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="center_box">
      <div class="people_box">
        <div class="one_box" v-for="item in imglist">
          <img class="woman" :src="item.img" />
          <img
            v-if="item.type == 1"
            class="follow"
            src="../../common/img/2@2x.png"
          />
          <div class="model" v-else>
            <div class="unlock">
              <div v-if="item.type == 2" @click="deblock">
                {{ $t("opengold") }}
              </div>
              <p v-if="item.type == 3">{{ $t("goldchance") }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="total_price">
        <div class="row">
          <div class="left">
            <div>
              {{ $t("threeflow") }}:
              {{
                format_with_substring(
                  parseFloat(activityContent.amount_total).toFixed(3)
                )
              }}
              VNDK
              <span
                >{{ $t("failgold") }}：{{ activityContent.delock_count }}
                {{ $t("place") }}</span
              >
            </div>
          </div>
          <div class="right">
            <Progress
              :show-text="false"
              :color="color"
              :text-inside="true"
              :stroke-width="10"
              :percentage="
                Number(activityContent.amount_total / 3188) * 100 > 100
                  ? 100
                  : Number(activityContent.amount_total / 3188) * 100
              "
            ></Progress>
            <div class="perct">
              {{
                format_with_substring(
                  parseFloat(activityContent.amount_total).toFixed(3)
                )
              }}
              VNDK
            </div>
            <div class="total">{{ format_with_substring(3188) }} VNDK</div>
          </div>
        </div>
      </div>
      <div class="center_bot">
        <div class="raise">
          {{ $t("raise") }}：{{
            format_with_substring(
              parseFloat(activityContent.plus_lottery_money).toFixed(3)
            )
          }}
          VNDK
        </div>
        <div class="btn" @click="getcollet(2)">
          <!-- <img src="../../common/img/3@2x.png"/> -->
          <div>{{ $t("pulldown") }}</div>
        </div>
      </div>
    </div>

    <div class="activity_content">
      <img class="pos1" src="../../common/img/denglong.png" />
      <img class="pos2" src="../../common/img/denglong.png" />
      <div class="all_box">
        <div class="title">
          <img src="../../common/img/1@2x.png" />
          <div>{{ $t("drewover") }}</div>
          <img src="../../common/img/2-3@2x.png" />
        </div>
        <div class="rowinfo">
          <div class="row_one">
            <!-- <div :class="lang == 'vi' ? 'line' : ''">
              【{{ $t("drewover") }}】
            </div> -->
            <p class="more">{{ $t("eggover") }}。</p>
          </div>
        </div>

        <div class="box_table ">
          <div class="til">① {{ $t("themaone") }}。</div>
          <div class="table">
            <div :class="lang == 'vi' ? 'header morehead' : 'header'">
              <div>{{ $t("game") }}</div>
              <div>{{ $t("task") }}</div>
              <div>{{ $t("taskmon") }}</div>
              <div :class="lang == 'vi' ? 'more' : ''">
                {{ $t("tasklimit") }}
              </div>
            </div>
            <div
              :class="lang == 'vi' ? 'body moretable' : 'body'"
              v-for="(item, i) in table1"
            >
              <div :class="lang == 'vi' ? `exceed ex${i}` : 'exceed'">
                {{ item.label }}
              </div>
              <div class="exceed">{{ $t("valid") }} {{ item.task }} VNDK</div>
              <div>{{ item.handsel }} VNDK</div>
              <div>{{ item.limit }}</div>
            </div>
          </div>
          <div class="til2">
            {{ $t("tips1") }}
          </div>
        </div>

        <div class="box_table">
          <div class="til">② {{ $t("extra") }}</div>
          <div class="table">
            <div class="header three">
              <div>{{ $t("lock") }}</div>
              <div :class="lang == 'vi' ? 'lineh' : ''">{{ $t("over") }}</div>
              <div>{{ $t("source") }}</div>
            </div>
            <div class="body three" v-for="item in table2">
              <div>{{ item.people }} {{ $t("place") }}</div>
              <div>{{ item.task }} {{ $t("ent") }}</div>
              <div>{{ item.handsel }} VNDK</div>
            </div>
          </div>
        </div>

        <div class="desc">
          <div class="state">【{{ $t("event") }}】</div>
          {{ $t("actinfo1") }}<br />
          {{ $t("actinfo2") }}<br />
          {{ $t("actinfo3") }}<br />
          {{ $t("actinfo4") }}<br />
          {{ $t("actinfo5") }}<br />
        </div>
      </div>
      <div class="fenge"></div>

      <img class="bottom_img" src="../../common/img/invalid-name@2x.png" />
      <div class="topbox">
        <div class="gotop" @click="backTop">{{ $t("gotop") }}</div>
      </div>
    </div>

    <div v-show="dialogVisible" class="model-box">
      <div class="modelveng" @click="dialogVisible = false"></div>
      <div class="modeltable">
        <div class="chief">{{ $t("grandbet") }}</div>
        <div class="table">
          <div class="header three">
            <div :class="lang == 'vi' ? 'time' : ''">{{ $t("index") }}</div>
            <div>{{ $t("order") }}</div>
            <div>{{ $t("color") }}</div>
            <div>{{ $t("gettime") }}</div>
          </div>
          <div class="body three" v-for="(item, i) in listdata">
            <div>{{ i + 1 }}</div>
            <div>{{ item.order_no }}</div>
            <div>{{ parseFloat(item.lottery_amount).toFixed(3) }}</div>
            <div>{{ item.created_at }}</div>
          </div>
        </div>
        <img
          class="dele"
          @click="dialogVisible = false"
          src="../../common/img/del.png"
        />
      </div>
    </div>

    <div v-show="darwdialog" class="model-box">
      <div class="modelveng" @click="darwdialog = false"></div>
      <div class="back_box">
        <div class="post">
          <img class="back" src="../../common/img/tips2.png" />
          <div class="num">{{ parseFloat(money).toFixed(3) }}VNDK</div>
          <div class="cons">{{ $t("congra") }}</div>
          <div class="dele">
            <img @click="darwdialog = false" src="../../common/img/del.png" />
          </div>
        </div>
      </div>
    </div>

    <div v-show="showlogin" class="model-box">
      <div class="modelveng" @click="showlogin = false"></div>
      <div class="login_box">
        <div class="post">
          <img class="back" src="../../common/img/top.png" />
          <div class="num">{{ $t("respect") }}</div>
          <div class="cons">{{ $t("login") }}</div>
          <div class="dele">
            <img @click="showlogin = false" src="../../common/img/del.png" />
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

import { getReceiveList, cumulativeTheme, getMoneyAdd, getunlock } from "@/api";
export default {
  components: {
    Progress: Progress,
  },
  data() {
    return {
      dialogVisible: false,
      darwdialog: false,
      showlogin: false,
      money: "",
      isenv: "",
      color: "#eda567",
      listdata: [],
      cersivelist: [
        {
          label: this.$t("granddep"),
          num: 0,
          percent: 0,
          total: 1500,
        },
        {
          label: this.$t("getmeet"),
          num: 0,
          percent: 0,
          total: 2800,
        },
        {
          label: this.$t("opendrew"),
          num: 0,
          percent: 0,
          total: 3500,
        },
      ],
      table1: [
        { label: this.$t("granddep"), task: "1,500", handsel: 10, limit: 15 },
        {
          label: this.$t("getmeet"),
          task: "2,800",
          handsel: 28,
          limit: 18,
        },
        { label: this.$t("opendrew"), task: "3,500", handsel: 35, limit: 20 },
      ],
      table2: [
        { people: 3, task: 15, handsel: 38 },
        { people: 5, task: 50, handsel: 108 },
        { people: 8, task: 100, handsel: 188 },
      ],

      uid: "",
      platform: "",
      lang: "vi",

      imglist: [
        { img: require("../../common/imgs/1@2x.png"), type: 3 },
        { img: require("../../common/imgs/2@2x.png"), type: 3 },
        { img: require("../../common/imgs/3@2x.png"), type: 3 },
        { img: require("../../common/imgs/4@2x.png"), type: 3 },
        { img: require("../../common/imgs/5@2x.png"), type: 3 },
        { img: require("../../common/imgs/6@2x.png"), type: 3 },
        { img: require("../../common/imgs/7@2x.png"), type: 3 },
        { img: require("../../common/imgs/8@2x.png"), type: 3 },
      ],
      activityContent: {
        total_number: 0,
        lottery_money: 0,
        amount_total: 0,
        plus_lottery_money: 0,
      },
      user_id: 100336,

      loading: "",
    };
  },

  async mounted() {
    let url = location.href;
    if (url.length > 0) {
      //判断是否携带参数
      let params = {};
      if (url.indexOf("?") != -1) {
        let str = url.substr(url.indexOf("?") + 1);
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
          params[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
      }

      let { uid, lang } = params;
      uid = Number(uid) ? uid : "";

      const isbro = this.judgeBrowser();
      if (isbro == "pc") {
        this.$router.replace(`/newyear_pc?uid=${uid}`);
      }
      this.user_id = uid;

      // if (lang) {
      //   this.lang = lang;
      //   this.$i18n.locale = lang;
      // }

      // 加载时显示loading
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log("uid", uid);
      this.getheme(uid);
      // this.getinfo(uid);
      setTimeout(() => {
        this.getheme(uid);
      }, 1000);
    }
  },
  methods: {
    backTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    // 解锁
    async deblock() {
      if (!this.user_id) {
        this.showlogin = true;
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
        this.showlogin = true;
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
          this.darwdialog = true;
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
        this.showlogin = true;
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
        this.dialogVisible = true;
      });
    },

    // 主题
    async getheme(user_id) {
      let list = [
        { img: require("../../common/imgs/1@2x.png") },
        { img: require("../../common/imgs/2@2x.png") },
        { img: require("../../common/imgs/3@2x.png") },
        { img: require("../../common/imgs/4@2x.png") },
        { img: require("../../common/imgs/5@2x.png") },
        { img: require("../../common/imgs/6@2x.png") },
        { img: require("../../common/imgs/7@2x.png") },
        { img: require("../../common/imgs/8@2x.png") },
      ];
      await cumulativeTheme({ user_id: user_id, platform_id: 10002 }).then(
        (res) => {
          if (res.code == 200) {
            this.loading.close();
            let data = res.data;
            // let data = {};
            // data.jl_today_number = 1;
            // data.ai_today_number = 2;
            // data.ae_today_number = 3;
            // data.delock_count = 2;
            // data.unlock_count = 2;
            // data.notlock_count = 4;

            // data.lottery_money = 8973.88;
            // data.amount_total = 56543.9;
            // data.plus_lottery_money = 8459.2;
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
            // this.$message({ type: "warning", message: res.msg });
            this.showlogin = true;
          }
        }
      );
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

.h5_container{
  width:100vw;
  font-family:Arial
  .banner{
    width:100%;
    height:auto;
    display:flex;
  }
  .top_box{
    background-image: linear-gradient(to bottom, #fffbf1, #fff6df);
    width:100vw;
    padding-top:r(20)
  }
  .top_content{
    width:r(360);
    height:r(82);
    margin:0 auto;
    background-image:url('../../common/imgs/invalidName.png');
    background-repeat:no-repeat;
    background-size:cover;
    display:flex;
    justify-content:space-between;
    .row_one{
      // display:flex;
      text-align:center;
      color: #7e0000;
      width:33.3%
      color:rgb(246 232 194)
      margin-top:r(22)
      div{
        font-size:r(13)
        margin-bottom:r(12)
      }
      p{
        font-size:r(10)
        font-weight:400;
        // width:r(245)
      }
      .more{
        line-height:r(18)
        margin-top:r(-2)
      }
    }
    .time{
      width:44%;
    }
  }
  .activity_content{
    width:100vw;
    // height:r(970);
    background-image: linear-gradient(to bottom, #fffbf1, #fff6df);
    position:relative;
    .pos1{
      position:absolute;
      left:0;
      top:r(0);
      width:r(37.5);
      height:auto;
    }
    .pos2{
      position:absolute;
      right:0;
      top:r(0);
      width:r(37.5);
      height:auto;
    }
    .all_box{
      // width:r2(1200);
      margin:0 auto;
    }
    .title{
      display:flex;
      justify-content:center;
      padding-top:r(35)
      img{
        width:r(42.5);
        height:r(21.5);
      }
      div{
        font-size: r(21);
        font-weight: 500;
        color: #690a0a;
        margin:0 r(8);
      }
    }
    .rowinfo{
      // display:flex;
      // justify-content:space-between;
      margin:r(25) r(15) 0 r(15);
      .row_one{
        display:flex;
        // text-align:center;
        color: #7e0000;
        div{
          // width:r(270)
          font-size:r(14)
          margin-bottom:r(12)
          color:rgb(126 0 0)
        }

        p{
          font-size:r(13)
          font-weight:400;
          width:r(245)
        }
        .line{
          width:r(270)
        }
        .more{
          width:100%;
          line-height:r(18)
          margin-top:r(-2)
        }
      }
    }

    .box_table{
      margin:r(20) r(15) 0 r(15);
      .til{
        font-size: r(12);
        color: #7e0000;
        line-height:r(14)
      }
      .table{
        background:#e1544a;
        margin:r(5) 0;
        .header{
          display:flex;
          justify-content space-between
          height:r(40);
          line-height:r(40);
          div{
            // width:25%;
            text-align:center;
            color:#fff;
            font-size:r(11);
            border-right:r(0.5) solid #ffeb8b;
          }
          .more{
            line-height:r(15);
            margin-top:r(5)
          }
        }
        .morehead{
          div:nth-child(1){
            width:33%;
          }
          div:nth-child(2){
            width:30%;
          }
          div:nth-child(3){
            width:17%;
          }
          div:nth-child(4){
            width:20%;
          }
        }

        .body{
          display:flex;
          justify-content space-between
          height:r(40);
          line-height:r(40);
          border-top:r(0.5) solid #ffeb8b;
          div{
            // width:25%
            text-align:center;
            color:#ffeb8b;;
            font-size:r(11);
            border-right:r(0.5) solid #ffeb8b;
          }
          .exceed{
            height:r(40);
            line-height: r(16);
            padding-top:r(5)
          }
        }
        .moretable{
          height:r(70);
          line-height:r(70);
          div:nth-child(1){
            width:33%
          }
          div:nth-child(2){
            width:30%
          }
          div:nth-child(3){
            width:17%
          }
          div:nth-child(4){
            width:20%
          }
          .exceed{
            height:r(70);
            line-height: r(16);
            padding-top:r(10)
          }
          .ex0{
            // height:r(60);
            padding-top:0
            line-height:r(70)
          }
          .ex2{
            height:r(70);
            padding-top:r(20)
          }
        }
        .three{
          div{
            width:33.3%;
          }
          .lineh{
            line-height:r(15)
            padding-top:r(5)
          }
        }
      }
      .til2{
        color: #000;
        font-size:r(10)
        line-height:r(14)
        // background:#fff;
        // padding:r(5) r(3)
        // margin-top:r(-5)
      }
    }
    .desc{
      margin:r(20) r(15) 0 r(15)
      color: #690a0a;
      font-size:r(12.5);
      line-height:r(21)
      .state{
        font-size:r(15);
      }
    }

    .fenge{
      height:r(140)
    }
    .topbox{
      width:100vw;
      display:flex;
      justify-content:center;
    }
    .gotop{
      position:absolute;
       margin: auto;
       bottom:r(60)
      width: r(140);
      height: r(40);
      line-height: r(40);
      text-align:center;
      color:#fff;
      font-size:r(15)
      border-radius: r(4);
      background-image: linear-gradient(to bottom, #fe5c5c, #d82c2c), linear-gradient(to bottom, #d8d8d8, #d8d8d8);
    }

    .bottom_img{
      width:100vw;
      height:auto;
      position:absolute;
      bottom:0
      left:0
    }
  }
  .center_box{
    background:#fff6df;
    width:100vw;
    height:r(1001);
    background-image:url('../../common/imgs/invalid-name@2x.png');
    background-repeat:no-repeat;
    background-size:cover;
    // display:flex;
    .people_box{
      margin:0 auto;
      align-self:center;
      vertical-align:middle;
      display:flex;
      justify-content:space-between;
      flex-wrap:wrap;
      padding-top:r(30);
      margin-left:r(15);
      margin-right:r(15)
      .one_box{
        width:r(164.5)
        height:r(190);
        position:relative;
        margin-bottom:r(10);
        .woman{
          width:r(164.5);
          height:r(190);
          display:flex;
        }
        .follow{
          position:absolute;
          top:0;
          left:0;
          width:r(45.2)
          height:r(30.5)
        }
        .model{
          position:absolute;
          width:100%;
          height:100%;
          top:0;
          left:0;
          background:rgba(73,0,0,0.7)
          display:flex;
          justify-content:center;
          align-items:center;
          .unlock{
            width:100%;
            div{
              width: r(80);
              height: r(26.5);
              line-height: r(26.5);
              border-radius: r(4);
              box-shadow: 0 r(2) r(3) 0 rgba(119, 0, 0, 0.5);
              border: solid r(0.5) #ffd599;
              background-image: linear-gradient(to bottom, #fe5c5c, #d82c2c);
              font-size:r(14);
              color: #ffeeba;
              text-align:center;
              margin:0 auto;
            }
            p{
              text-align:center;
              font-size:r(15);
              color:#fff;
            }
          }
        }
      }
    }
    .total_price{
      margin:0 auto;
      .row{
          width:100%;
          // background:#fdf0d2;
          color:#902828;
          font-size:r(12);
          // display:flex;
          // justify-content:space-between;
          padding: r(5) r(15);
          margin-bottom:r(12);
          .left{
            div{
              margin:r(10) 0;
              color:#ffefb9
              span{
                margin-left:r(20)
              }
            }
          }
          .right{
            width:100%;
            position:relative;
            margin-right:r(50);
            .el-progress{
              margin-top:r(49);
            }

            .perct{
              width: r(110);
              height: r(20);
              line-height: r(20);
              background-color: #fbedc9;
              color: #c53a3a;
              text-align center;
              position:absolute;
              left:0;
              bottom:r(20);
              font-size:r(11);
              &:after{
                position:absolute;
                content:'';
                border-top:r(6) solid #fbedc9;
                border-left:r(6) solid transparent;
                border-right:r(6) solid transparent;
                left:r(33);
                bottom: r(-5);
              }
            }

            .total{
              width:r(94);
              height:r(20);
              line-height:r(20);
              text-align:center;
              border:r(0.5) solid #ffd569;
              color:#ffe78b;
              // background: #fcdec2;
              font-size:r(11);
              position:absolute;
              right:r(0);
              bottom:r(20);

              &:before{
                position:absolute;
                content:'';
                border-top:r(6) solid #ffe78b;
                border-left:r(6) solid transparent;
                border-right:r(6) solid transparent;
                left:r(40);
                bottom: r(-6);
              }
              &:after{
                position:absolute;
                content:'';
                border-top:r(4) solid #c53a3a;
                border-left:r(4) solid transparent;
                border-right:r(4) solid transparent;
                left:r(42);
                bottom: r(-4.2);
              }
            }
            /deep/ .el-progress-bar__outer{
              position:relative;
              // overflow:none !important;
              background:#fbedc9 !important;
              border:r(0.5) solid #f89797;
            }
            /deep/ .el-progress-bar__innerText{
              margin-top:r(-30);
              width: r(80);
              height: r(20);
              line-height: r(20);
              background-color: #fbedc9;
              color: #c53a3a;
              text-align center;
              position:absolute;
              left:0;
              font-size:r(11);
              &:after{
                position:absolute;
                content:'';
                border-top:r(6) solid #fbedc9;
                border-left:r(6) solid transparent;
                border-right:r(6) solid transparent;
                left:r(33);
                bottom: r(-5);
              }
            }
          }
      }
    }

    .center_bot{
      display:flex;
      justify-content:space-between;
      margin:0 auto;
      margin-left:r(15)
      margin-right:r(15)
      .raise{
        width: r(215);
        height: r(40);
        line-height: r(40);
        text-align:center;
        color: #c53a3a;
        font-size:r(11)
        // margin: r2(53) 125.9px 2px 18.2px;
        // padding: 16px 129px 17px 42px;
        border-radius: r(20);
        box-shadow: 0 r(1) r(3) 0 rgba(84, 0, 0, 0.5);
        border: solid r(1) #c71616;
        background-image: linear-gradient(92deg, #fdf7e6 2%, #e6cc8a 97%);
      }
      .btn{
        // position:relative;
        width:r(110);
        height:r(40);
        line-height:r(40);
        background-image:url('../../common/imgs/3-2@2x.png');
        background-repeat:no-repeat;
        background-size:cover;
        text-align center
        color: #7e0000;
        font-size:r(15)
        // margin-left:r(40);
      }
    }
  }
  .receive{
    width:100vw;
    height:r(500.5);
    background-image: linear-gradient(to bottom, #fffbf1, #fff6df);
    position:relative;

    .pos1{
      position:absolute;
      left:0;
      bottom:r(-15);
      width:r(54.9);
      height:r(64);
    }
    .pos2{
      position:absolute;
      right:0;
      top:r(10);
      left:0
      width:r(90.9);
      height:auto;
    }
    .pos3{
      position:absolute;
      right:0;
      top:r(60);
      right:0
      width:r(90.9);
      height:auto;
    }
      .rece_box{
        width:100%;
        margin:0 auto;
        // display:flex;
        align-self:center;
        vertical-align:middle
        .title{
          padding-top:r(30);
          position:relative;
          width:r(160);
          margin:0 auto;
          margin-bottom:r(10);
          img{
            width:r(160);
            height:auto;
          }
          div{
            width:r(160);
            height:r(40);
            text-align:center;
            line-height:r(45);
            font-size:r(14);
            color:#f6e8c2;
            position:absolute;
            left:0;
            top:r(28)
          }
        }
        .row{
          width:100%;
          background:#fdf0d2;
          color:#902828;
          font-size:r(12);
          // display:flex;
          // justify-content:space-between;
          padding: r(5) r(15) r(10) r(15);
          margin-bottom:r(12);
          .left{
            div{
              margin:r(10) 0;
              .mar{
                margin-left:r(15)
              }
            }
          }
          .right{
            width:100%;
            position:relative;
            // margin-right:r(50);
            .el-progress{
              margin-top:r(35);
            }
            .perc{
              width: r(110);
              height: r(20);
              line-height: r(20);
              background-color: #c53a3a;
              color: #ffea81;
              text-align center;
              position:absolute;
              left:0
              // top:r(-30);
              bottom:r(19);
              font-size:r(11);
              &:after{
                position:absolute;
                content:'';
                border-top:r(6) solid #c53a3a;
                border-left:r(6) solid transparent;
                border-right:r(6) solid transparent;
                left:r(32);
                bottom: r(-5);
              }
            }
            .total{
              width:r(90);
              height:r(20);
              line-height:r(20);
              text-align:center;
              border:r(1) solid #c53a3a;
              color:#c53a3a;
              background: #fcdec2;
              font-size:r(11);
              position:absolute;
              right:r(0);
              bottom:r(19);

              &:before{
                position:absolute;
                content:'';
                border-top:r(6) solid #c53a3a;
                border-left:r(6) solid transparent;
                border-right:r(6) solid transparent;
                left:r(38);
                bottom: r(-7);
              }
              &:after{
                position:absolute;
                content:'';
                border-top:r2(4) solid #fcdec2;
                border-left:r2(4) solid transparent;
                border-right:r2(4) solid transparent;
                left:r(34.5);
                bottom: r(-6);
              }
            }
            /deep/ .el-progress-bar__outer{
              position:relative;
              // overflow:none !important;
              background:#fbedc9 !important;
              border:r(1) solid #f89797;
            }
            /deep/ .el-progress-bar__innerText{
              width: r(80);
              height: r(20);
              line-height: r(20);
              background-color: #c53a3a;
              color: #ffea81;
              text-align center;
              position:absolute;
              left:0
              top:r(-30);
              font-size:r(11);
              &:after{
                position:absolute;
                content:'';
                border-top:r(6) solid #c53a3a;
                border-left:r(6) solid transparent;
                border-right:r(6) solid transparent;
                left:r(32);
                bottom: r(-5);
              }
            }
          }
        }
        .grand{
          display:flex;
          justify-content:space-between;
          margin:0 r(15);
          margin-top:r(15);

          .all{
            color: #ce0000;

            .num{
              font-size:r(14);
              color:rgb(144 40 40);
              margin-top:r(5)
              span{
                color:rgb(206 0 0);
              }
            }
            .mon{
              color:rgb(144 40 40);
              font-size:r(15);
              font-weight:600;
              margin-top:r(5)
              span{
                color:rgb(206 0 0);
              }
            }
          }
          .btn{
            position:relative;
            width:r(147);
            height:r(47);
            img{
              width:r(147);
              height:auto;
            }
            div{
              position:absolute;
              top:0;
              left:0;
              font-size:r(18);
              color: #f6e8c2;
              width:r(147);
              height:r(47);
              line-height:r(47);
              text-align:center;
            }
          }
        }
      }
  }

}

.model-box{
  width:100vw;
  height:100vh;
  position:fixed;
  z-index:20;
  top:0;
  left:0
  .modelveng{
    width:100vw;
    height:100vh;
    position:absolute;
    top:0;
    left:0
    background:rgba(0,0,0,0.5)
  }
}
.login_box{
  position:absolute;
  width:100%;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:22;
  .post{
    width:r(300);
    height:auto
    position:relative;
    .back{
      width:100%;
      height:auto;
    }
    .num{
      font-size:r(16);
      color:rgb(255 236 187);
      position:absolute;
      width:100%;
      text-align:center;
      top:r(17)
    }
    .cons{
      font-size:r(16);
      color:rgb(169 33 2);
      position:absolute;
      width:80%;
      text-align:center;
      left:10%
      top:r(75)
      line-height:r(20)
    }

    .dele{
      width:100%;
      text-align:center
      img{
        width:r(34);
        height:auto;
      }
    }
  }
}
.back_box{
  position:absolute;
  width:100%;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:22;
  .post{
    width:r(200);
    height:auto
    position:relative;
    .back{
      width:100%;
      height:auto;
    }
    .num{
      font-size:r(16);
      color:rgb(250, 74, 5);
      position:absolute;
      width:100%;
      text-align:center;
      top:r(35)
    }
    .cons{
      font-size:r(16);
      color:#fff;
      position:absolute;
      width:90%;
      left:5%;
      text-align:center;
      top:r(115)
    }
    .dele{
      width:100%;
      text-align:center
      img{
        width:r(34);
        height:auto;
      }
    }
  }

}
.modeltable{
  position:absolute;
  width:90%;
  height:r(440);
  background:#fff;
  z-index:22;
  left:5%
  top:20%;
  .chief{
    width:100%;
    height:r(40);
    line-height:r(40)
    color:#fff;
    background:#e1544a;
    font-size:r(15)
    text-align:center;
  }
  .table{
    width:100%;
    background:#fff;
    height:r(400);
    overflow:auto
    // margin:r(5) 0;
    .header{
      display:flex;
      justify-content space-between
      height:r(40);
      line-height:r(40);
      div:nth-child(1){
        width:12%;
        text-align:center;
        color:#000;
        font-size:r(11);
      }
      div:nth-child(2){
        width:25%;
        text-align:center;
        color:#000;
        font-size:r(11);
      }
      div:nth-child(3){
        width:23%;
        text-align:center;
        color:#000;
        font-size:r(11);
      }
      div:nth-child(4){
        width:40%;
        text-align:center;
        color:#000;
        font-size:r(11);
      }
      .time{
        height:r(30)
        line-height:r(13)
        margin-top:r(8)
      }
    }

    .body{
      display:flex;
      justify-content space-between
      height:r(40);
      line-height:r(40);
      border-top:r(0.5) solid #ddd;
      div:nth-child(1){
        width:12%;
        text-align:center;
        color:000;;
        font-size:r(11);
      }
      div:nth-child(2){
        width:25%;
        text-align:center;
        color:000;;
        font-size:r(11);
      }
      div:nth-child(3){
        width:23%;
        text-align:center;
        color:000;;
        font-size:r(11);
      }
      div:nth-child(4){
        width:40%;
        text-align:center;
        color:000;;
        font-size:r(11);
      }
      .exceed{
        height:r(30);
        line-height: r(16);
        margin-top:r(5)
      }
      // .time{
      //   line-height:r(20)
      //   width:r(120)
      // }
    }

  }
  .dele{
    position:absolute;
    bottom:r(-40)
    width:r(34);
    height:auto;
    left:50%;
    margin-left:r(-17)
  }
}
/deep/ .el-progress-bar__outer{
  overflow:inherit !important;
}

.el-table{
    background-color: rgba(38, 38, 38, 0.75);
    border-radius: 9px;
  }
</style>
