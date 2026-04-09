import React from "react";
import { FiCode, FiMail, FiGlobe, FiGithub } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Developer = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 mt-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-pink-50 rounded-xl">
            <FiCode className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Developer Information
            </h1>
            <p className="text-sm text-slate-500">
              Details about the development team behind this CRM.
            </p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="px-4 py-1.5 rounded-full bg-pink-50 text-primary border-pink-100 font-semibold"
        >
          v1.0.4 - Premium
        </Badge>
      </div>

      {/* Main Developer Card */}
      <Card className="max-w-full overflow-hidden rounded-2xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="h-20 bg-gradient-to-r from-pink-500/10 via-rose-400/10 to-pink-500/10 border-b border-slate-50" />
        <CardContent className="relative px-6 pb-8">
          <div className="absolute -top-12 left-6">
            <div className="p-4 bg-white rounded-2xl shadow-md border border-slate-100">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-primary/20">
                AG
              </div>
            </div>
          </div>

          <div className="pt-16 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                AG Solutions
              </h2>
              <p className="text-primary font-medium">
                Software Development & IT Services
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed max-w-4xl text-lg">
              Crafting high-performance, user-centric software solutions that
              drive business growth. Our team specialized in building robust CRM
              systems, web applications, and community platforms tailored to
              unique organizational needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-colors group">
                <div className="p-2 bg-white rounded-lg shadow-sm text-primary group-hover:scale-110 transition-transform">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                    Email Us
                  </p>
                  <p className="text-slate-900 font-medium">
                    solutions.ag@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-colors group">
                <div className="p-2 bg-white rounded-lg shadow-sm text-primary group-hover:scale-110 transition-transform">
                  <FiGlobe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                    Website
                  </p>
                  <p className="text-slate-900 font-medium">
                    www.agsolutions.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Developer;
