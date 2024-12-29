export interface PincodeData {
  State: string;
  District: string;
  Country: string;
}

interface PostOffice {
  State: string;
  District: string;
  Country: string;
}

interface PincodeResponse {
  Message: string;
  Status: string;
  PostOffice: PostOffice[] | null;
}

export const fetchAddressFromPincode = async (pincode: string): Promise<PincodeData> => {
  try {
    console.log("Fetching pincode:", pincode);
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    console.log("API response:", data);

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid API response");
    }

    if (data[0].Status === "Error" || !data[0].PostOffice || data[0].PostOffice.length === 0) {
      throw new Error("Invalid pincode");
    }

    const postOffice = data[0].PostOffice[0];
    return {
      State: postOffice.State,
      District: postOffice.District,
      Country: "India",
    };
  } catch (error) {
    console.error("Pincode service error:", error);
    throw new Error("Failed to fetch address details");
  }
};
