'use client';

import { Bean, BrewMethod, Log } from '@prisma/client';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ArrowLeft, Coffee, ThermometerSun, Timer, Weight } from 'lucide-react';
import Link from 'next/link';
import LogActions from './LogActions'; // Import the LogActions component

type LogWithDetails = Log & {
  bean: Bean;
  method: BrewMethod;
};

export function LogPageClient({ log }: { log: LogWithDetails }) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Link
          href="/logs/history"
          className="inline-flex items-center text-[#1B4332] mb-6 hover:text-[#1B4332]/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          뒤로 가기
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-serif text-[#1B4332] mb-2">
                {log.bean.name}
              </h1>
              <p className="text-[#1B4332]/60 text-sm">
                {format(new Date(log.createdAt), 'PPP', { locale: ko })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[#1B4332]/60">
                <Coffee className="w-4 h-4" />
                <span className="text-sm">{log.method.name}</span>
              </div>
              <LogActions logId={log.id} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-[#1B4332]">
              <Weight className="w-4 h-4" />
              <span>
                {log.doseIn}g → {log.doseOut}g
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#1B4332]">
              <ThermometerSun className="w-4 h-4" />
              <span>{log.temperature}°C</span>
            </div>
            <div className="flex items-center gap-2 text-[#1B4332]">
              <Timer className="w-4 h-4" />
              <span>{log.timeSeconds}초</span>
            </div>
            {log.ratio && (
              <div className="flex items-center gap-2 text-[#1B4332]">
                <span className="font-mono">1:{log.ratio}</span>
              </div>
            )}
          </div>

          {log.notes && (
            <div className="border-t border-gray-100 pt-4">
              <h2 className="text-lg font-serif text-[#1B4332] mb-2">메모</h2>
              <p className="text-[#1B4332]/80 whitespace-pre-wrap">{log.notes}</p>
            </div>
          )}

          {log.improvements && (
            <div className="border-t border-gray-100 pt-4 mt-4">
              <h2 className="text-lg font-serif text-[#1B4332] mb-2">
                다음에 개선할 점
              </h2>
              <p className="text-[#1B4332]/80 whitespace-pre-wrap">
                {log.improvements}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-serif text-[#1B4332] mb-4">원두 정보</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {log.bean.origin && (
              <div>
                <dt className="text-sm text-[#1B4332]/60">원산지</dt>
                <dd className="text-[#1B4332]">{log.bean.origin}</dd>
              </div>
            )}
            {log.bean.farm && (
              <div>
                <dt className="text-sm text-[#1B4332]/60">농장</dt>
                <dd className="text-[#1B4332]">{log.bean.farm}</dd>
              </div>
            )}
            {log.bean.altitude && (
              <div>
                <dt className="text-sm text-[#1B4332]/60">고도</dt>
                <dd className="text-[#1B4332]">{log.bean.altitude}m</dd>
              </div>
            )}
            {log.bean.variety && (
              <div>
                <dt className="text-sm text-[#1B4332]/60">품종</dt>
                <dd className="text-[#1B4332]">{log.bean.variety}</dd>
              </div>
            )}
            {log.bean.process && (
              <div>
                <dt className="text-sm text-[#1B4332]/60">가공방식</dt>
                <dd className="text-[#1B4332]">{log.bean.process}</dd>
              </div>
            )}
            {log.bean.roastLevel && (
              <div>
                <dt className="text-sm text-[#1B4332]/60">로스팅 레벨</dt>
                <dd className="text-[#1B4332]">{log.bean.roastLevel}</dd>
              </div>
            )}
            {log.bean.roastDate && (
              <div>
                <dt className="text-sm text-[#1B4332]/60">로스팅 날짜</dt>
                <dd className="text-[#1B4332]">
                  {format(new Date(log.bean.roastDate), 'PPP', { locale: ko })}
                </dd>
              </div>
            )}
          </div>
          {log.bean.description && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <dt className="text-sm text-[#1B4332]/60 mb-1">원두 특징</dt>
              <dd className="text-[#1B4332] whitespace-pre-wrap">
                {log.bean.description}
              </dd>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
