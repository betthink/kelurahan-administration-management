import {  Card,  List } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../../utils/axiosInstance";
import { Link } from "react-router-dom";

export default function SuperAdminView({redirect , titlelink}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
        <List
          grid={{
            gutter: 16,
            column: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={
                  <div>
                    <p className="flex justify-between">
                      <span>RT</span>
                      <span className="text-green-600 ">{item.rt}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>RW</span>
                      <span className="text-green-600 ">{item.rw}</span>
                    </p>
                  </div>
                }
              >
                <Link className="text-blue-400" state={item} to={redirect}>
                  {titlelink}
                </Link>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </Content>
  );
}
