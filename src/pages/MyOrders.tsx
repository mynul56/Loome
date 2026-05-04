import FootballLoader from "@/components/FootballLoader";
import Layout from "@/components/Layout";
import { authService } from "@/services/auth.service";
import { Order } from "@/services/db";
import { mediaService } from "@/services/media.service";
import { orderService } from "@/services/order.service";
import {
    ShoppingBag
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyOrders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderImageUrls, setOrderImageUrls] = useState<Record<string, string>>(
    {},
  );
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const loadOrders = async () => {
      try {
        const userOrders = await orderService.getOrdersByUser(user.id);
        // Sort by newest first
        userOrders.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setOrders(userOrders);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [user, navigate]);

  useEffect(() => {
    const resolveOrderImages = async () => {
      const entries: Array<readonly [string, string]> = [];
      for (const order of orders) {
        for (let i = 0; i < order.items.length; i += 1) {
          const item = order.items[i];
          const key = `${order.id}:${i}`;
          const url = await mediaService.resolveProductImageUrl(item.image);
          entries.push([key, url] as const);
        }
      }
      setOrderImageUrls(Object.fromEntries(entries));
    };

    if (orders.length > 0) {
      resolveOrderImages();
    } else {
      setOrderImageUrls({});
    }
  }, [orders]);

  if (isLoading) {
    return (
      <Layout>
        <FootballLoader text="Fetching History..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="bg-black text-white px-6 lg:px-12 py-12 border-b-8 border-primary">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-5xl lg:text-7xl font-heading uppercase tracking-tighter">
              Order <span className="text-primary">History</span>
            </h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest mt-2">
              Track your 2026 squads
            </p>
          </div>
        </div>

        <div className="px-6 lg:px-12 max-w-[1400px] mx-auto mt-12">
          {orders.length === 0 ? (
            <div className="bg-white p-12 text-center border-4 border-black sport-shadow">
              <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-gray-200" />
              <h2 className="text-3xl font-heading uppercase mb-4">
                No Orders Yet
              </h2>
              <p className="text-gray-500 font-bold mb-8 uppercase">
                You haven't secured any kits yet.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-primary text-black px-12 py-4 font-heading text-2xl uppercase border-4 border-black hover:bg-black hover:text-white transition-all transform hover:-translate-y-1"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border-4 border-black sport-shadow overflow-hidden group"
                >
                  {/* Header */}
                  <div className="bg-black text-white p-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                          Order ID
                        </p>
                        <p className="font-heading text-xl text-primary">
                          {order.id}
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                          Date
                        </p>
                        <p className="font-bold uppercase text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={`px-4 py-1 font-heading text-lg uppercase skew-x-[-12deg] flex items-center gap-2
                        ${
                          order.status === "Delivered"
                            ? "bg-green-600"
                            : order.status === "Cancelled"
                              ? "bg-red-600"
                              : "bg-primary text-black"
                        }`}
                      >
                        <span className="skew-x-[12deg]">{order.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-4">
                      {order.items.map((item, idx) => {
                        const imageKey = `${order.id}:${idx}`;
                        const imageSrc = orderImageUrls[imageKey] || "";
                        return (
                          <div
                            key={imageKey}
                            className="flex gap-4 items-center border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                          >
                            <div className="w-16 h-20 bg-gray-50 border-2 border-black flex-shrink-0 overflow-hidden">
                              <img
                                src={
                                  imageSrc ||
                                  "https://via.placeholder.com/300x400/111/FFF?text=KIT"
                                }
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-heading text-xl uppercase leading-tight">
                                {item.productName}
                              </h4>
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                SIZE {item.selectedSize} • QTY {item.quantity}
                              </p>
                            </div>
                            <div className="ml-auto font-jersey text-xl">
                              ৳{item.price * item.quantity}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="lg:col-span-4 bg-gray-50 p-6 border-l-4 border-black flex flex-col justify-between">
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Shipping To
                          </p>
                          <p className="text-sm font-bold uppercase">
                            {order.customerName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.deliveryAddress}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Contact
                          </p>
                          <p className="text-xs font-bold uppercase">
                            {order.phone}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t-2 border-gray-200">
                        <div className="flex justify-between items-end">
                          <span className="font-heading text-xl uppercase">
                            Total Paid
                          </span>
                          <span className="font-jersey text-4xl text-primary font-bold bg-black px-3">
                            ৳{order.totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;
