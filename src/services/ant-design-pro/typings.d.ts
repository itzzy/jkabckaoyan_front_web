// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUserResult = {
    success: boolean;
    msg?: string;
    errorMsg?: string;
    data?: CurrentUser;
  };
  
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    success: boolean;
    msg?: string;
    errorMsg?: string;
    data?: {};
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type GradeCountList = {
    data?: GradeCountData[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type TrailUserCheckResult = {
    data?: boolean;
    total?: number;
    success?: boolean;
  };

  type ScoreTrendDataList = {
    data?: ScoreTrendData[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type SchoolBasicInfoResponse = {
    data?: SchoolBasicInfo;
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type ReportInfoResponse = {
    data?: ReportDivInfo[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RankInfoResponse = {
    data?: SchoolBasicInfo;
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type GradeCountData = {
    scoreRange?: string;
    count?: number;
  };

  type ScoreTrendData = {
    majorName?: string;
    year?: string;
    value?: number;
  };

  type SchoolBasicInfo = {
    schoolName?: string;
    province?: string;
    schoolRankTag?: string;
    csRankTag?: string;
    seRankTag?: string;
    areaTag?: string;
    detailMarkdown?: string;
  };

  type ReportDivInfo = {
    divType?: string;
    title?: string;
    elementId?: string;
    data?: any;
  };

  type RankBasicInfo = {
    rankName?: string;
    detailMarkdown?: string;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type PptParams = {
    title1?: string;
    title2?: string;
    text1?: string;
    text2?: string;
    text3?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
