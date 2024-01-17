import { Avatar, Divider, List, Skeleton } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosInstance } from "../../../../../utils/axiosInstance";
import { Link } from "react-router-dom";

export default function SuperAdminView() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const handleGetLembaga = async () => {
    const url = `/administrasikelurahan/src/api/lembaga/fetch_all_lembaga.php`;
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.get(url);
      const data = response.data;
      if (response.status === 200) {
        setData(data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    // loadMoreData();
    handleGetLembaga();
  }, []);
  return (
    <Content
      style={{ position: "sticky", top: 400 }}
      className=" min-h-[40rem]  overflow-x-auto"
    >
      <div className="min-w-full bg-white p-10  rounded-md mb-10  overflow-x-auto">
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            // next={loadMoreData}
            // hasMore={data.length < 50}
            loader={
              <Skeleton
                avatar
                paragraph={{
                  rows: 1,
                }}
                active
              />
            }
            endMessage={<Divider plain>Data habis</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item.rt}>
                  <List.Item.Meta
                    // avatar={<Avatar src={item.picture.large} />
                    // }
                    title={
                      <div className="flex gap-10">
                        <span>RT</span>
                        <span className="text-green-700">{item.rt}</span>
                      </div>
                    }
                    description={
                      <div className="flex gap-10">
                        <span>RW</span>
                        <span className="text-red-700">{item.rw}</span>
                      </div>
                    }
                  />
                  <Link state={item} to="/Dashboard/Detail-penduduk-rt">
                    Lihat
                  </Link>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
    </Content>
  );
}
