import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Job } from "../types/types";
import Spinner from "../components/Spinner";

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `/api/jobs/${id}`;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.log("Error while fetching job ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [apiUrl]);

  return loading ? <Spinner loading={loading} /> : <h1>{job?.title}</h1>;
};

export default JobPage;
