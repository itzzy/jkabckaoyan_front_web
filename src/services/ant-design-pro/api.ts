// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUserResult;
  }>('/api/currentUser', {
    method: 'GET',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    data: body,
    ...(options || {}),
  });
}

/** 生成ppt GET /api/pptGenerate */
export async function pptGenerate(
    params: {
        // query
        title1?: string;
        title2?: string;
        text1?: string;
        text2?: string;
        text3?: string;
    },
    options?: { [key: string]: any },
) {
    return request<API.RuleList>('/api/pptGenerate', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    ...(options || {}),
  });
}

/** 考研信息综合查询 GET /api/commonSearch */
export async function commonSearch(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/commonSearch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 考研信息综合查询 GET /api/commonSearchForFreeVersion */
export async function commonSearchForFreeVersion(
    params: {
        // query
        /** 当前的页码 */
        current?: number;
        /** 页面的容量 */
        pageSize?: number;
    },
    options?: { [key: string]: any },
) {
    return request<API.RuleList>('/api/commonSearchForFreeVersion', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 考研信息综合查询 GET /api/commonSearch */
export async function schoolDetailSearch(
  params: {
    // query
    /** 当前的页码 */
    schoolName?: string;
    /** 页面的容量 */
    verifyCode?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/commonSearch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 考研信息综合查询 GET /api/commonSearch */
export async function selfDefineSearch(
    params: {
        // query
        /** 当前的ids */
        ids?: string;
    },
    options?: { [key: string]: any },
) {
    return request<API.RuleList>('/api/commonSearch', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/**  大数据统计 GET /api/listStaticInfo */
export async function listStaticInfo(
    params: {
        // query
        /** 当前的ids */
        ids?: string;
    },
    options?: { [key: string]: any },
) {
    return request<API.RuleList>('/api/listStaticInfo', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/**  获取23复试录取人数柱状图统计信息 GET /api/getCountStaticInfoList23 */
export async function getCountStaticInfoList23(
    params: {
        // query
        /** 当前的ids */
        ids?: string;
    },
    options?: { [key: string]: any },
) {
    return request<API.RuleList>('/api/getCountStaticInfoList23', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/**  获取23复试录取人数柱状图统计信息 GET /api/getCountStaticInfoList23 */
export async function getCountStaticInfoList24(
    params: {
        // query
        /** 当前的ids */
        ids?: string;
    },
    options?: { [key: string]: any },
) {
    return request<API.RuleList>('/api/getCountStaticInfoList24', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/**  获取复试录取人数柱状图统计信息 GET /api/getCountStaticInfoList */
export async function getCountStaticInfoList(
    params: {
        // query
        /** 当前的ids */
        ids?: string;
    },
    options?: { [key: string]: any },
) {
    return request<API.RuleList>('/api/getCountStaticInfoList', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/**  大数据统计 GET /api/rankStaticInfo */
export async function rankStaticInfo(
    params: {
        // query
        /** 当前的ids */
        rankName?: string;
    },
    options?: { [key: string]: any },
) {
    return request<API.RuleList>('/api/rankStaticInfo', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 考研信息综合查询 GET /api/rankQuery */
export async function rankQuery(
  params: {
    // query
    /** 当前的页码 */
    rankName?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rankQuery', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 报录比信息综合查询 GET /api/enrollmentRankQuery */
export async function enrollmentRankQuery(
    params: {
        // query
        /** 当前的页码 */
        rankName?: string;
    },
    options?: { [key: string]: any },
) {
    return request<API.RuleList>('/api/enrollmentRankQuery', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 考研信息综合查询 GET /api/commonSearch */
export async function getScoreTrend(
  params: {
    // query
    /** 学校名称 */
    schoolName?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ScoreTrendDataList>('/api/getScoreTrend', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 考研信息综合查询 GET /api/getRankScoreTrend */
export async function getRankScoreTrend(
  params: {
    // query
    /** 学校名称 */
    schoolName?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ScoreTrendDataList>('/api/getRankScoreTrend', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 院校基本信息查询 GET /api/getSchoolBasicInfo */
export async function getSchoolBasicInfo(
    params: {
        // query
        /** 学校名称 */
        schoolName?: string;
    },
    options?: { [key: string]: any },
) {
    return request<API.SchoolBasicInfoResponse>('/api/getSchoolBasicInfo', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 排行榜基本信息查询 GET /api/getRankBasicInfo */
export async function getRankBasicInfo(
  params: {
    // query
    /** 学校名称 */
    rankName?: string;
    style?:string;
  },
  options?: { [key: string]: any },
) {
  return request<API.SchoolBasicInfoResponse>('/api/getRankBasicInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 报录比基本信息查询 GET /api/getEnrollmentRankBasicInfo */
export async function getEnrollmentRankBasicInfo(
    params: {
        // query
        /** 学校名称 */
        rankName?: string;
    },
    options?: { [key: string]: any },
) {
    return request<API.SchoolBasicInfoResponse>('/api/getEnrollmentRankBasicInfo', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 获取报表信息 GET /api/getReportData */
export async function getReportData(
  params: {
    // query
    /** 考生姓名 */
    userName?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.SchoolBasicInfoResponse>('/api/getReportData', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取报表信息 GET /api/getMajorDetail */
export async function getMajorDetail(
  params: {
    // query
  },
  options?: { [key: string]: any },
) {
  return request<API.ReportDivInfo>('/api/getMajorDetail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}




/** 初试成绩分布表 GET /api/getGradeCountList */
export function getGradeCountList(
  params: {
    // query
    /** 学校名称 */
    schoolName?: string;
  },
  options?: { [key: string]: any }) {
  return request<API.GradeCountList>('/api/getGradeCountList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 学校名称列表 GET /api/getSchoolList */
export function getSchoolList(
  options?: { [key: string]: any }) {
  return request<API.GradeCountList>('/api/getSchoolList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 专业名称列表 GET /api/getMajorList */
export function getMajorList(
    options?: { [key: string]: any }) {
    return request<API.GradeCountList>('/api/getMajorList', {
        method: 'GET',
        ...(options || {}),
    });
}

/** 学校名称列表 GET /api/getSchoolListByRank */
export function getSchoolListByRank(
    options?: { [key: string]: any }) {
    return request<API.GradeCountList>('/api/getSchoolListByRank', {
        method: 'GET',
        ...(options || {}),
    });
}


/** 新闻素材列表 GET /api/getNewsList */
export function getNewsList(
    params: {
        // query
        /** 时间间隔 */
        interval?: string;
    },
    options?: { [key: string]: any },
) {
    return request<API.GradeCountList>('/api/getNewsList', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 分类排行榜列表 GET /api/getSchoolList */
export function getRankList(
  options?: { [key: string]: any }) {
  return request<API.GradeCountList>('/api/rankList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分类排行榜列表 GET /api/isTrailUser */
export function isTrailUser(
    options?: { [key: string]: any }) {
    return request<API.TrailUserCheckResult>('/api/isTrailUser', {
        method: 'GET',
        ...(options || {}),
    });
}

/** 报录比报告列表 GET /api/enrollmentRankList */
export function getEnrollmentRankList(
    options?: { [key: string]: any }) {
    return request<API.GradeCountList>('/api/enrollmentRankList', {
        method: 'GET',
        ...(options || {}),
    });
}


/** 考研信息对比查询 GET /api/compareSearch */
export async function compareSearch(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/compareSearch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 22招生人数对比查询 GET /api/admissionCountSearch */
export async function admissionCountSearch(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/admissionCountSearch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 22专硕招生信息对比查询 GET /api/admissionCountSearchZS */
export async function admissionCountSearchZS(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/admissionCountSearchZS', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 22新增学院招生人数对比查询 GET /api/admissionCountSearchNew */
export async function admissionCountSearchNew(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/admissionCountSearchNew', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 22新增学院专硕招生信息对比查询 GET /api/admissionCountSearchZSNew */
export async function admissionCountSearchZSNew(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/admissionCountSearchZSNew', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
